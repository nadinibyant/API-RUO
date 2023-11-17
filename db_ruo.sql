-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 17 Nov 2023 pada 17.22
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_ruo`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `chatterry`
--

CREATE TABLE `chatterry` (
  `id_chat` int(11) NOT NULL,
  `pertanyaan` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `chatuser`
--

CREATE TABLE `chatuser` (
  `id_chat_user` int(11) NOT NULL,
  `id_chat` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `jawaban` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `comment`
--

CREATE TABLE `comment` (
  `id_comment` int(11) NOT NULL,
  `id_message` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `isi_comment` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `hideaccount`
--

CREATE TABLE `hideaccount` (
  `id_hide` int(11) NOT NULL,
  `status_hide` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `message`
--

CREATE TABLE `message` (
  `id_message` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `isi_message` longtext NOT NULL,
  `id_hide` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `therapy`
--

CREATE TABLE `therapy` (
  `id_therapy` int(11) NOT NULL,
  `foto_psikolog` varchar(255) NOT NULL,
  `nama_psikolog` varchar(50) NOT NULL,
  `lama_karir` int(3) NOT NULL,
  `no_telp_psikolog` varchar(13) NOT NULL,
  `medsos_psikolog` varchar(30) DEFAULT NULL,
  `like` int(11) DEFAULT 0,
  `dislike` int(11) DEFAULT 0,
  `spesialis_psikolog` varchar(100) NOT NULL,
  `id_user` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `therapy`
--

INSERT INTO `therapy` (`id_therapy`, `foto_psikolog`, `nama_psikolog`, `lama_karir`, `no_telp_psikolog`, `medsos_psikolog`, `like`, `dislike`, `spesialis_psikolog`, `id_user`, `created_at`, `updated_at`) VALUES
(2, 'Pahlawan Indonesia, Bro Tomo, Pahlawan Indonesia, Indonesia PNG dan Vektor dengan Background Transparan untuk Unduh Gratis.jpeg', 'nadini2', 1, '08228342656', 'diniii', 0, 0, 'kedokterwan jiwa banget', 3, '2023-11-17 14:21:18', '2023-11-17 15:39:04'),
(4, 'kebun teh.jpeg', 'dia', 12, '23234234', 'diadia', 0, 0, 'dokter jiwa', 2, '2023-11-17 16:13:12', '2023-11-17 16:13:12');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `medsos` varchar(30) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `username`, `email`, `password`, `phone`, `medsos`, `description`, `created_at`, `updated_at`) VALUES
(1, 'nadini', 'nadini@gmail.com', '$2b$10$X5.3DV5G5xDb9WQV/yBiWuIb7BWPdDmAIJRf8kNlvmndzP3Y60GNW', NULL, NULL, NULL, '2023-11-17 13:42:54', '2023-11-17 14:12:14'),
(2, 'nadila', 'nadila@gmail.com', '$2b$10$wkuNnT2gsSlYz0hdrFPNM.pER1SWjPb6Dtp8LoQuo6wulZFLS0HO.', NULL, NULL, NULL, '2023-11-17 13:43:18', '2023-11-17 13:43:18'),
(3, 'nadila12', 'nadila12@gmail.com', '$2b$10$Yx/nvK6gQU/2VCNPp2Xfbeo2K6d/PadZaiY5JSTs643nQ.GV3oZhi', NULL, NULL, NULL, '2023-11-17 13:48:13', '2023-11-17 13:48:13');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `chatterry`
--
ALTER TABLE `chatterry`
  ADD PRIMARY KEY (`id_chat`);

--
-- Indeks untuk tabel `chatuser`
--
ALTER TABLE `chatuser`
  ADD PRIMARY KEY (`id_chat_user`),
  ADD KEY `id_chat` (`id_chat`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `id_message` (`id_message`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `hideaccount`
--
ALTER TABLE `hideaccount`
  ADD PRIMARY KEY (`id_hide`);

--
-- Indeks untuk tabel `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_hide` (`id_hide`);

--
-- Indeks untuk tabel `therapy`
--
ALTER TABLE `therapy`
  ADD PRIMARY KEY (`id_therapy`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `chatterry`
--
ALTER TABLE `chatterry`
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `chatuser`
--
ALTER TABLE `chatuser`
  MODIFY `id_chat_user` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `comment`
--
ALTER TABLE `comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `hideaccount`
--
ALTER TABLE `hideaccount`
  MODIFY `id_hide` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `message`
--
ALTER TABLE `message`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `therapy`
--
ALTER TABLE `therapy`
  MODIFY `id_therapy` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `chatuser`
--
ALTER TABLE `chatuser`
  ADD CONSTRAINT `chatuser_ibfk_1` FOREIGN KEY (`id_chat`) REFERENCES `chatterry` (`id_chat`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chatuser_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`id_message`) REFERENCES `message` (`id_message`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`id_hide`) REFERENCES `hideaccount` (`id_hide`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `therapy`
--
ALTER TABLE `therapy`
  ADD CONSTRAINT `therapy_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
