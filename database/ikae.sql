-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 05 nov. 2024 à 12:18
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `type` varchar(255) NOT NULL,
  `material` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `in_stock` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `product_name`, `price`, `type`, `material`, `color`, `state`, `description`, `in_stock`, `user_id`, `created_at`, `updated_at`) VALUES
(6, 'Table en chêne', 120, 'table', 'bois', 'marron', 'neuf', 'Table en bois massif idéale pour la salle à manger.', 1, 1, '2024-01-15 10:23:00', '2024-02-01 09:10:00'),
(7, 'Canapé en cuir', 750, 'canapé', 'cuir', 'noir', 'très bon état', 'Canapé confortable en cuir véritable, parfait pour le salon.', 0, 1, '2024-03-10 14:45:00', '2024-03-10 14:45:00'),
(8, 'Lampe de chevet', 25.99, 'lampe', 'plastique', 'blanc', 'bon état', 'Lampe de chevet moderne, parfaite pour une ambiance douce.', 1, 1, '2024-04-18 08:00:00', '2024-04-20 09:00:00'),
(9, 'Chaise en acier', 45, 'chaise', 'acier', 'gris', 'état satisfaisant', 'Chaise robuste en acier, idéale pour un usage extérieur.', 1, 1, '2024-05-12 12:30:00', '2024-05-12 12:30:00'),
(10, 'Fauteuil en tissu', 299, 'fauteuil', 'tissu', 'bleu', 'neuf', 'Fauteuil confortable en tissu bleu, parfait pour le salon.', 0, 1, '2024-06-20 11:15:00', '2024-06-22 15:10:00'),
(11, 'Armoire vintage en bois', 520, 'armoire', 'bois', 'marron', 'très bon état', 'Armoire spacieuse en bois massif avec une finition vintage.', 1, 1, '2024-02-02 15:00:00', '2024-02-10 17:30:00'),
(12, 'Tapis marocain', 250.5, 'tapis', 'tissu', 'rouge', 'bon état', 'Tapis marocain fait main, ajoute une touche d\'exotisme à votre intérieur.', 1, 1, '2024-02-10 11:15:00', '2024-02-11 08:45:00'),
(13, 'Chaise en plastique empilable', 15.99, 'chaise', 'plastique', 'bleu', 'neuf', 'Chaise légère et empilable, parfaite pour un usage extérieur.', 1, 1, '2024-02-20 10:20:00', '2024-02-20 10:20:00'),
(14, 'Lampe en acier industrielle', 75, 'lampe', 'acier', 'gris', 'état satisfaisant', 'Lampe au style industriel, parfaite pour une décoration moderne.', 0, 1, '2024-02-22 14:55:00', '2024-02-23 16:10:00'),
(15, 'Table basse en verre', 199, 'table', 'verre', 'blanc', 'très bon état', 'Table basse élégante en verre trempé, idéale pour les salons modernes.', 1, 1, '2024-03-01 13:30:00', '2024-03-03 11:00:00'),
(16, 'Fauteuil en cuir blanc', 350, 'fauteuil', 'cuir', 'blanc', 'neuf', 'Fauteuil luxueux en cuir blanc, parfait pour les salons chics.', 1, 1, '2024-03-05 09:00:00', '2024-03-05 09:00:00'),
(17, 'Canapé d\'angle en tissu', 850, 'canapé', 'tissu', 'gris', 'très bon état', 'Canapé d\'angle spacieux en tissu gris, confortable et moderne.', 0, 1, '2024-03-12 18:20:00', '2024-03-15 10:30:00'),
(18, 'Lit en bois massif', 620, 'lit', 'bois', 'marron', 'bon état', 'Lit double en bois massif, robuste et confortable.', 1, 1, '2024-03-20 12:00:00', '2024-03-20 12:00:00'),
(19, 'Table pliante en plastique', 40, 'table', 'plastique', 'blanc', 'état satisfaisant', 'Table pliante pratique, idéale pour les petits espaces.', 1, 1, '2024-03-25 16:00:00', '2024-03-25 16:00:00'),
(20, 'Lampe de table en bois', 32.5, 'lampe', 'bois', 'marron', 'neuf', 'Petite lampe en bois avec un abat-jour beige, parfaite pour le bureau.', 1, 1, '2024-04-01 09:00:00', '2024-04-01 09:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `super_user` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `email`, `password`, `super_user`, `created_at`, `updated_at`) VALUES
(1, 'Lauréline', 'Fleury', 'Lauréline F.', 'laurelinefleury@wanadoo.fr', 'root', 1, '2024-11-05 10:47:43', NULL);

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
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_userid_orderid` (`user_id`);

--
-- Index pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orderitemid_orderid` (`order_id`),
  ADD KEY `fk_orderitemid_productid` (`product_id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_userid_productid` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `fk_productid_imageid` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_userid_orderid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_orderitemid_orderid` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `fk_orderitemid_productid` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_userid_productid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
