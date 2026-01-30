<?php
defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\Database\DatabaseInterface;

class ImageGalleryService
{
  private function db(): DatabaseInterface
  {
    return Factory::getContainer()->get(DatabaseInterface::class);
  }

  public function getGallerySettings(int $galleryId): array
  {
    if ($galleryId <= 0) {
      return [];
    }

    $db = $this->db();
    $query = $db->getQuery(true)
      ->select('*')
      ->from($db->quoteName('#__imagegallery_gallery'))
      ->where($db->quoteName('id') . ' = ' . (int) $galleryId);

    $db->setQuery($query);

    return $db->loadAssoc() ?: [];
  }

  public function getGalleryImages(int $galleryId): array
  {
    if ($galleryId <= 0) {
      return [];
    }

    $db = $this->db();
    $query = $db->getQuery(true)
      ->select('*')
      ->from($db->quoteName('#__imagegallery_image'))
      ->where($db->quoteName('gallery_id') . ' = ' . $galleryId)
      ->where($db->quoteName('state') . ' = 1')
      ->order($db->quoteName('ordering') . ' ASC');

    $db->setQuery($query);

    return $db->loadAssocList() ?: [];
  }
}