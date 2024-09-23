
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

--
-- Estrutura para tabela `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `videoid` int(11) NOT NULL,
  `comment` longtext NOT NULL,
  `likes` int(11) NOT NULL,
  `username` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `journeys`
--

CREATE TABLE `journeys` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `stage` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `level` int(11) NOT NULL,
  `icon` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `journeys`
--

INSERT INTO `journeys` (`id`, `name`, `description`, `stage`, `created_at`, `level`, `icon`) VALUES
(1, 'Introdução às Finanças', 'Aprenda os conceitos básicos de finanças, incluindo orçamento, poupança e investimentos.', 0, '2024-07-21 03:02:23', 1, ''),
(2, 'Planejamento Financeiro', 'Descubra como criar e manter um plano financeiro pessoal.', 0, '2024-07-21 03:02:23', 2, ''),
(3, 'Investimentos e Ações', 'Entenda como investir em ações e outros instrumentos financeiros.', 0, '2024-07-21 03:02:23', 3, ''),
(4, 'Gestão de Dívidas', 'Saiba como gerenciar e pagar suas dívidas de forma eficaz.', 0, '2024-07-21 03:02:23', 4, '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `journeys_stages`
--

CREATE TABLE `journeys_stages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `journey_id` int(11) DEFAULT NULL,
  `title` varchar(60) NOT NULL,
  `content` longtext NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `journeys_stages`
--

INSERT INTO `journeys_stages` (`id`, `journey_id`, `title`, `content`, `completed`) VALUES
(1, 1, 'Etapa 1', 'Primeira etapa de exemplo da jornada 1', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(60) NOT NULL,
  `avatar` longtext NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `user_journeys`
--

CREATE TABLE `user_journeys` (
  `id` int(11) NOT NULL,
  `journey_id` int(11) DEFAULT NULL,
  `completed` tinyint(1) DEFAULT 0,
  `stages` int(11) DEFAULT NULL,
  `actual_stage` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `videos`
--

INSERT INTO `videos` (`id`, `url`, `name`) VALUES
(1, 'https://www.youtube.com/embed/BKATrAAWrRo', 'CSS EM 15 MINUTOS! ESTILIZAÇÃO, POSITION E MAIS...'),
(2, 'https://www.youtube.com/embed/-FQP7hD-J6A', 'TODAS AS TAGS HTML QUE VOCÊ PRECISA SABER');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_x_comment` (`userid`),
  ADD KEY `video_x_comment` (`videoid`);

--
-- Índices de tabela `journeys`
--
ALTER TABLE `journeys`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `journeys_stages`
--
ALTER TABLE `journeys_stages`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `user_journeys`
--
ALTER TABLE `user_journeys`
  ADD PRIMARY KEY (`id`),
  ADD KEY `journey_id` (`journey_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT de tabela `journeys`
--
ALTER TABLE `journeys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `journeys_stages`
--
ALTER TABLE `journeys_stages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `user_journeys`
--
ALTER TABLE `user_journeys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de tabela `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `user_x_comment` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `video_x_comment` FOREIGN KEY (`videoid`) REFERENCES `videos` (`id`);

--
-- Restrições para tabelas `user_journeys`
--
ALTER TABLE `user_journeys`
  ADD CONSTRAINT `user_journeys_ibfk_1` FOREIGN KEY (`journey_id`) REFERENCES `journeys` (`id`),
  ADD CONSTRAINT `user_journeys_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;