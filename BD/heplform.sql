-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mar 23 Août 2022 à 17:44
-- Version du serveur :  5.7.11
-- Version de PHP :  5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `heplform`
--

-- --------------------------------------------------------

--
-- Structure de la table `formulaire`
--

CREATE TABLE `formulaire` (
  `id` int(11) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `idUser` varchar(255) NOT NULL,
  `dateCreation` date NOT NULL,
  `dateExpiration` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `formulaire`
--

INSERT INTO `formulaire` (`id`, `Nom`, `idUser`, `dateCreation`, `dateExpiration`) VALUES
(76, 'Test 1 ', 'Test@hepl.be', '2022-08-23', '2022-09-03');

-- --------------------------------------------------------

--
-- Structure de la table `partagelecture`
--

CREATE TABLE `partagelecture` (
  `IdForm` int(11) NOT NULL,
  `Email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE `questions` (
  `idQuestion` int(11) NOT NULL,
  `typeQuestion` int(11) NOT NULL,
  `libelle` varchar(255) DEFAULT NULL,
  `formId` int(11) DEFAULT NULL,
  `obligatoire` int(11) DEFAULT NULL,
  `extraInformation` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `questions`
--

INSERT INTO `questions` (`idQuestion`, `typeQuestion`, `libelle`, `formId`, `obligatoire`, `extraInformation`) VALUES
(112, 1, 'Test', 76, 1, '["Test 1","Test 2","Test 3"]'),
(113, 2, 'Test ', 76, 1, NULL),
(114, 4, 'Test 6', 76, 0, '["Test 1","Test 2","Test 3"]'),
(115, 3, 'Test 5', 76, 0, NULL),
(116, 6, 'Test 10', 76, 0, NULL),
(117, 5, 'Test', 76, 0, '["Test 7","Test 4","Test 3"]'),
(118, 7, 'NUMERIQUE TEST ', 76, 0, '["9","9"]');

-- --------------------------------------------------------

--
-- Structure de la table `reponsecreation`
--

CREATE TABLE `reponsecreation` (
  `params` varchar(255) NOT NULL,
  `idForm` int(11) DEFAULT NULL,
  `UserId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `reponsequestion`
--

CREATE TABLE `reponsequestion` (
  `idReponse` int(11) NOT NULL,
  `idParams` varchar(255) NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `typeQuestion` int(11) NOT NULL,
  `obligatoire` tinyint(1) NOT NULL,
  `extentedClass` varchar(255) DEFAULT NULL,
  `Reponse` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `reponsequestion`
--

INSERT INTO `reponsequestion` (`idReponse`, `idParams`, `libelle`, `typeQuestion`, `obligatoire`, `extentedClass`, `Reponse`) VALUES
(7, 'fqqNojSidM', 'Test', 1, 1, '["Test 1","Test 2","Test 3"]', NULL),
(8, 'fqqNojSidM', 'Test ', 2, 1, NULL, NULL),
(9, 'fqqNojSidM', 'Test 6', 4, 0, '["Test 1","Test 2","Test 3"]', NULL),
(10, 'fqqNojSidM', 'Test 5', 3, 0, NULL, NULL),
(11, 'fqqNojSidM', 'Test 10', 6, 0, NULL, NULL),
(12, 'fqqNojSidM', 'Test', 5, 0, '["Test 7","Test 4","Test 3"]', NULL),
(13, 'fqqNojSidM', 'NUMERIQUE TEST ', 7, 0, '["9","9"]', NULL),
(14, 'qpZ6WAIeN1', 'Test', 1, 1, '["Test 1","Test 2","Test 3"]', NULL),
(15, 'qpZ6WAIeN1', 'Test ', 2, 1, NULL, NULL),
(16, 'qpZ6WAIeN1', 'Test 6', 4, 0, '["Test 1","Test 2","Test 3"]', NULL),
(17, 'qpZ6WAIeN1', 'Test 5', 3, 0, NULL, NULL),
(18, 'qpZ6WAIeN1', 'Test 10', 6, 0, NULL, NULL),
(19, 'qpZ6WAIeN1', 'Test', 5, 0, '["Test 7","Test 4","Test 3"]', NULL),
(20, 'qpZ6WAIeN1', 'NUMERIQUE TEST ', 7, 0, '["9","9"]', NULL),
(21, 'keYiysVwBI', 'Test', 1, 1, '["Test 1","Test 2","Test 3"]', NULL),
(22, 'keYiysVwBI', 'Test ', 2, 1, NULL, NULL),
(23, 'keYiysVwBI', 'Test 6', 4, 0, '["Test 1","Test 2","Test 3"]', NULL),
(24, 'keYiysVwBI', 'Test 5', 3, 0, NULL, NULL),
(25, 'keYiysVwBI', 'Test 10', 6, 0, NULL, NULL),
(26, 'keYiysVwBI', 'Test', 5, 0, '["Test 7","Test 4","Test 3"]', NULL),
(27, 'keYiysVwBI', 'NUMERIQUE TEST ', 7, 0, '["9","9"]', NULL),
(28, 'ilywgQPU9k', 'Test', 1, 1, '["Test 1","Test 2","Test 3"]', NULL),
(29, 'ilywgQPU9k', 'Test ', 2, 1, NULL, NULL),
(30, 'ilywgQPU9k', 'Test 6', 4, 0, '["Test 1","Test 2","Test 3"]', NULL),
(31, 'ilywgQPU9k', 'Test 5', 3, 0, NULL, NULL),
(32, 'ilywgQPU9k', 'Test 10', 6, 0, NULL, NULL),
(33, 'ilywgQPU9k', 'Test', 5, 0, '["Test 7","Test 4","Test 3"]', NULL),
(34, 'ilywgQPU9k', 'NUMERIQUE TEST ', 7, 0, '["9","9"]', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `Email` varchar(255) NOT NULL,
  `Nom` varchar(255) DEFAULT NULL,
  `Prenom` varchar(255) DEFAULT NULL,
  `MDP` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `utilisateur`
--

INSERT INTO `utilisateur` (`Email`, `Nom`, `Prenom`, `MDP`) VALUES
('Test@hepl.be', 'Test', 'Test', '$2y$12$spO4KVdHs5kdyuLurf02W.RrT8c9ga7cgmNzAA25VmR3TqbHMTNE.');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `formulaire`
--
ALTER TABLE `formulaire`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_IdUser` (`idUser`);

--
-- Index pour la table `partagelecture`
--
ALTER TABLE `partagelecture`
  ADD PRIMARY KEY (`IdForm`);

--
-- Index pour la table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`idQuestion`),
  ADD KEY `FK_Form` (`formId`);

--
-- Index pour la table `reponsecreation`
--
ALTER TABLE `reponsecreation`
  ADD PRIMARY KEY (`params`),
  ADD KEY `FK_Reponsecreation_Idform` (`idForm`),
  ADD KEY `fk_foreign_Userid` (`UserId`);

--
-- Index pour la table `reponsequestion`
--
ALTER TABLE `reponsequestion`
  ADD PRIMARY KEY (`idReponse`),
  ADD KEY `fk_params` (`idParams`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`Email`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `formulaire`
--
ALTER TABLE `formulaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
--
-- AUTO_INCREMENT pour la table `questions`
--
ALTER TABLE `questions`
  MODIFY `idQuestion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;
--
-- AUTO_INCREMENT pour la table `reponsequestion`
--
ALTER TABLE `reponsequestion`
  MODIFY `idReponse` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `formulaire`
--
ALTER TABLE `formulaire`
  ADD CONSTRAINT `FK_IdUser` FOREIGN KEY (`idUser`) REFERENCES `utilisateur` (`Email`);

--
-- Contraintes pour la table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `FK_Form` FOREIGN KEY (`formId`) REFERENCES `formulaire` (`id`);

--
-- Contraintes pour la table `reponsecreation`
--
ALTER TABLE `reponsecreation`
  ADD CONSTRAINT `fk_foreign_Userid` FOREIGN KEY (`UserId`) REFERENCES `utilisateur` (`Email`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
