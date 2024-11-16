-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 06 nov. 2024 à 11:28
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
--
-- Base de données : `ikae`
--

-- --------------------------------------------------------
--
-- Structure de la table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_link` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
--
-- Déchargement des données de la table `images`
--

INSERT INTO `images` (
    `id`,
    `product_id`,
    `image_link`,
    `description`,
    `created_at`,
    `updated_at`
  )
VALUES (
    1,
    6,
    'http://localhost:3000/img/table-chene-marron.webp',
    'an image of a brown oak table',
    '2024-11-05 14:14:02',
    '2024-11-05 14:14:02'
  ),
  (
    2,
    6,
    'http://localhost:3000/img/table-chene-marron-1.webp',
    'an image of a brown oak table',
    '2024-11-05 14:14:02',
    '2024-11-05 14:14:02'
  ),
  (
    3,
    6,
    'http://localhost:3000/img/table-chene-marron-2.webp',
    'an image of a brown oak table',
    '2024-11-05 14:14:02',
    '2024-11-05 14:14:02'
  ),
  (
    4,
    6,
    'http://localhost:3000/img/table-chene-marron-3.webp',
    'an image of a brown oak table',
    '2024-11-05 14:14:02',
    '2024-11-05 14:14:02'
  ),
  (
    5,
    7,
    'http://localhost:3000/img/canape-cuir-noir.webp',
    'an image of a black sofa',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    6,
    7,
    'http://localhost:3000/img/canape-cuir-noir-1.webp',
    'an image of a black sofa',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    7,
    7,
    'http://localhost:3000/img/canape-cuir-noir-2.webp',
    'an image of a black sofa',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    8,
    7,
    'http://localhost:3000/img/canape-cuir-noir-3.webp',
    'an image of a black sofa',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    9,
    8,
    'http://localhost:3000/img/lampe-chevet-blanc.webp',
    'an image of a white lamp',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    10,
    8,
    'http://localhost:3000/img/lampe-chevet-blanc-1.webp',
    'an image of a white lamp',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    11,
    8,
    'http://localhost:3000/img/lampe-chevet-blanc-2.webp',
    'an image of a white lamp',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    12,
    8,
    'http://localhost:3000/img/lampe-chevet-blanc-3.webp',
    'an image of a white lamp',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    13,
    9,
    'http://localhost:3000/img/chaise-acier-gris.webp',
    'an image of a steel chair',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    14,
    9,
    'http://localhost:3000/img/chaise-acier-gris-1.jfif',
    'an image of a steel chair',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    15,
    9,
    'http://localhost:3000/img/chaise-acier-gris-2.jfif',
    'an image of a steel chair',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    16,
    9,
    'http://localhost:3000/img/chaise-acier-gris-3.jfif',
    'an image of a steel chair',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    17,
    10,
    'http://localhost:3000/img/fauteuil-tissu-bleu.webp',
    'an image of a blue sofa',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    18,
    10,
    'http://localhost:3000/img/fauteuil-tissu-bleu-1.webp',
    'an image of a blue sofa',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    19,
    10,
    'http://localhost:3000/img/fauteuil-tissu-bleu-2.webp',
    'an image of a blue sofa',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    20,
    10,
    'http://localhost:3000/img/fauteuil-tissu-bleu-3.webp',
    'an image of a blue sofa',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    21,
    11,
    'http://localhost:3000/img/armoire-vintage-bois.webp',
    'an image of a wooden closet',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    22,
    11,
    'http://localhost:3000/img/armoire-vintage-bois-1.webp',
    'an image of a wooden closet',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    23,
    11,
    'http://localhost:3000/img/armoire-vintage-bois-2.webp',
    'an image of a wooden closet',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    24,
    11,
    'http://localhost:3000/img/armoire-vintage-bois-3.webp',
    'an image of a wooden closet',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    25,
    12,
    'http://localhost:3000/img/tapis-marocain-rouge.webp',
    'an image of a red carpet',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    26,
    12,
    'http://localhost:3000/img/tapis-marocain-rouge-1.webp',
    'an image of a red carpet',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    27,
    12,
    'http://localhost:3000/img/tapis-marocain-rouge-2.webp',
    'an image of a red carpet',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    28,
    12,
    'http://localhost:3000/img/tapis-marocain-rouge-3.webp',
    'an image of a red carpet',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    29,
    13,
    'http://localhost:3000/img/chaise-plastique-bleu.webp',
    'an image of a blue chair',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    30,
    13,
    'http://localhost:3000/img/chaise-plastique-bleu-1.webp',
    'an image of a blue chair',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    31,
    13,
    'http://localhost:3000/img/chaise-plastique-bleu-2.webp',
    'an image of a blue chair',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    32,
    13,
    'http://localhost:3000/img/chaise-plastique-bleu-3.webp',
    'an image of a blue chair',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    33,
    14,
    'http://localhost:3000/img/lampe-acier-gris.webp',
    'an image of a steel lamp',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    34,
    14,
    'http://localhost:3000/img/lampe-acier-gris-1.webp',
    'an image of a steel lamp',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    35,
    14,
    'http://localhost:3000/img/lampe-acier-gris-2.webp',
    'an image of a steel lamp',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    36,
    14,
    'http://localhost:3000/img/lampe-acier-gris-3.webp',
    'an image of a steel lamp',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    37,
    15,
    'http://localhost:3000/img/table-basse-blanc.webp',
    'an image of a white table',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    38,
    15,
    'http://localhost:3000/img/table-basse-blanc-1.webp',
    'an image of a white table',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    39,
    15,
    'http://localhost:3000/img/table-basse-blanc-2.webp',
    'an image of a white table',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    40,
    15,
    'http://localhost:3000/img/table-basse-blanc-3.webp',
    'an image of a white table',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    41,
    16,
    'http://localhost:3000/img/fauteuil-cuir-blanc.webp',
    'an image of a white sofa',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    42,
    16,
    'http://localhost:3000/img/fauteuil-cuir-blanc-1.webp',
    'an image of a white sofa',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    43,
    16,
    'http://localhost:3000/img/fauteuil-cuir-blanc-2.webp',
    'an image of a white sofa',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    44,
    16,
    'http://localhost:3000/img/fauteuil-cuir-blanc-3.webp',
    'an image of a white sofa',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    45,
    17,
    'http://localhost:3000/img/canape-angle-gris.webp',
    'an image of a grey sofa',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    46,
    17,
    'http://localhost:3000/img/canape-angle-gris-1.webp',
    'an image of a grey sofa',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    47,
    17,
    'http://localhost:3000/img/canape-angle-gris-2.webp',
    'an image of a grey sofa',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    48,
    17,
    'http://localhost:3000/img/canape-angle-gris-3.webp',
    'an image of a grey sofa',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    49,
    18,
    'http://localhost:3000/img/lit-bois-massif.webp',
    'an image of a wooden bed',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    50,
    18,
    'http://localhost:3000/img/lit-bois-massif-1.webp',
    'an image of a wooden bed',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    51,
    18,
    'http://localhost:3000/img/lit-bois-massif-2.webp',
    'an image of a wooden bed',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    52,
    18,
    'http://localhost:3000/img/lit-bois-massif-3.webp',
    'an image of a wooden bed',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    53,
    19,
    'http://localhost:3000/img/table-pliante-blanc.webp',
    'an image of a white table',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    54,
    19,
    'http://localhost:3000/img/table-pliante-blanc-1.webp',
    'an image of a white table',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    55,
    19,
    'http://localhost:3000/img/table-pliante-blanc-2.webp',
    'an image of a white table',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    56,
    19,
    'http://localhost:3000/img/table-pliante-blanc-3.webp',
    'an image of a white table',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    57,
    20,
    'http://localhost:3000/img/lampe-table-bois.webp',
    'an image of a wooden lamp',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    58,
    20,
    'http://localhost:3000/img/lampe-table-bois-1.webp',
    'an image of a wooden lamp',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    59,
    20,
    'http://localhost:3000/img/lampe-table-bois-2.webp',
    'an image of a wooden lamp',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  ),
  (
    60,
    20,
    'http://localhost:3000/img/lampe-table-bois-3.webp',
    'an image of a wooden lamp',
    '2024-11-05 14:56:57',
    '2024-11-05 14:56:57'
  );
--
-- Index pour les tables déchargées
--

--
-- Index pour la table `images`
--
ALTER TABLE `images`
ADD PRIMARY KEY (`id`),
  ADD KEY `fk_productid_imageid` (`product_id`);
--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 61;
--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `images`
--
ALTER TABLE `images`
ADD CONSTRAINT `fk_productid_imageid` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;