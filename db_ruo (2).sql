-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 27 Des 2023 pada 15.11
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
  `pertanyaan` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `chatterry`
--

INSERT INTO `chatterry` (`id_chat`, `pertanyaan`, `created_at`, `updated_at`) VALUES
(1, 'Halo....\n\nSalam kenal ya aku Terry, sahabat yang akan membantu mu di RUO\n\nGimana kabar mu hari ini?', '2023-11-18 05:40:34', '2023-11-18 05:40:34'),
(2, 'Terry pernah dengar, pelangi nggak abadi. Tapi senyum kamu harus selalu abadi ya...', '2023-11-18 05:40:34', '2023-11-18 05:40:34');

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

--
-- Dumping data untuk tabel `chatuser`
--

INSERT INTO `chatuser` (`id_chat_user`, `id_chat`, `id_user`, `jawaban`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'ya gitulahh fine fine se', '2023-11-28 15:46:56', '2023-11-28 15:46:56'),
(2, 1, 1, 'ya gitulahh fine fine se', '2023-11-29 10:24:48', '2023-11-29 10:24:48'),
(3, 1, 1, 'alham', '2023-11-29 17:22:28', '2023-11-29 17:22:28'),
(4, 2, 1, 'iya tau', '2023-11-30 01:23:06', '2023-11-30 01:23:06'),
(5, 1, 1, 'alhamdulillah', '2023-11-30 01:37:15', '2023-11-30 01:37:15'),
(6, 2, 1, 'iyaa gitu ajaaa2', '2023-11-30 01:37:23', '2023-11-30 01:37:23'),
(7, 1, 1, 'alhamdulillah baik', '2023-11-30 06:37:08', '2023-11-30 06:37:08'),
(8, 2, 1, 'siapp terimakasih teryy', '2023-11-30 06:37:26', '2023-11-30 06:37:26'),
(9, 1, 1, 'ya bagus', '2023-11-30 07:05:06', '2023-11-30 07:05:06'),
(10, 2, 1, 'iya makasih terry', '2023-11-30 07:05:12', '2023-11-30 07:05:12'),
(11, 1, 1, 'alhm', '2023-12-02 15:16:00', '2023-12-02 15:16:00'),
(12, 2, 1, '1234', '2023-12-02 15:16:05', '2023-12-02 15:16:05'),
(13, 1, 1, 'alhamdulillah', '2023-12-07 14:54:16', '2023-12-07 14:54:16'),
(14, 2, 1, 'iyaaa tau kok', '2023-12-07 14:54:25', '2023-12-07 14:54:25'),
(15, 1, 1, 'alhamdulillah baik', '2023-12-27 13:55:45', '2023-12-27 13:55:45'),
(16, 2, 1, 'iya makasih terry', '2023-12-27 13:55:55', '2023-12-27 13:55:55');

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
-- Struktur dari tabel `dislike`
--

CREATE TABLE `dislike` (
  `id_dislike` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_therapy` int(11) NOT NULL,
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

--
-- Dumping data untuk tabel `hideaccount`
--

INSERT INTO `hideaccount` (`id_hide`, `status_hide`, `created_at`, `updated_at`) VALUES
(1, 'Disembunyikan', '2023-11-18 09:47:40', '2023-11-18 09:47:40'),
(2, 'Ditampilkan', '2023-11-18 09:47:46', '2023-11-18 09:47:46');

-- --------------------------------------------------------

--
-- Struktur dari tabel `like`
--

CREATE TABLE `like` (
  `id_like` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_therapy` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `like`
--

INSERT INTO `like` (`id_like`, `id_user`, `id_therapy`, `created_at`, `updated_at`) VALUES
(88, 1, 35, '2023-12-27 14:08:07', '2023-12-27 14:08:07');

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
  `spesialis_psikolog` varchar(100) NOT NULL,
  `id_user` int(11) NOT NULL,
  `alamat_lengkap` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `like` int(5) DEFAULT NULL,
  `dislike` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `therapy`
--

INSERT INTO `therapy` (`id_therapy`, `foto_psikolog`, `nama_psikolog`, `lama_karir`, `no_telp_psikolog`, `medsos_psikolog`, `spesialis_psikolog`, `id_user`, `alamat_lengkap`, `created_at`, `updated_at`, `like`, `dislike`) VALUES
(31, 'ss final alibaba 2.jpg', 'nadini', 56, '23234234', 'diadia', 'jajiwww', 1, 'Rumah Sakit Universitas Andalas', '2023-12-27 05:00:25', '2023-12-27 14:08:15', 0, 0),
(35, 'IMG_20231226_224549.jpg', 'fsdfs', 2, '23123', 'dasd', 'sdfdsf', 1, 'Rumah Sakit Universitas Andalas', '2023-12-27 14:07:17', '2023-12-27 14:08:07', 1, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `foto_user` varchar(255) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `medsos` varchar(30) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `fcmToken` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `foto_user`, `username`, `email`, `password`, `phone`, `medsos`, `description`, `fcmToken`, `created_at`, `updated_at`) VALUES
(1, NULL, 'dini123', 'dini123@gmail.com', '$2b$10$4kH2SB7gm85W.3Ab3yZCfeUWvilgtf6aLULwjdsgqYO1pcQmAj4ge', NULL, NULL, NULL, 'cdXIJCWoRsO5w6Aaf4q8mC:APA91bEo0VGiI5Gtj3Kh9IOgZTKmp-y3HI0wp54IHwd-JK1bFTlLGpNVTbPQ1cGkDy_Q3dob4KD3gvvtDMp2tOUelXdIH8K6ANb4ch8HojjeDYrvzue-4cTYNRAXqrY9AaVWbuQ9SSys', '2023-11-24 04:52:01', '2023-12-27 14:06:03'),
(2, NULL, 'dini1234', 'dini1234@gmail.com', '$2b$10$NF/PVBLBOc7mtdScyZq2fOkOWyW1.u1Aq99G51yLLnUCclwmxLB3y', NULL, NULL, NULL, '', '2023-11-28 15:31:52', '2023-11-28 15:31:52');

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
-- Indeks untuk tabel `dislike`
--
ALTER TABLE `dislike`
  ADD PRIMARY KEY (`id_dislike`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_therapy` (`id_therapy`);

--
-- Indeks untuk tabel `hideaccount`
--
ALTER TABLE `hideaccount`
  ADD PRIMARY KEY (`id_hide`);

--
-- Indeks untuk tabel `like`
--
ALTER TABLE `like`
  ADD PRIMARY KEY (`id_like`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_therapy` (`id_therapy`);

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
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `chatuser`
--
ALTER TABLE `chatuser`
  MODIFY `id_chat_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `comment`
--
ALTER TABLE `comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `dislike`
--
ALTER TABLE `dislike`
  MODIFY `id_dislike` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT untuk tabel `hideaccount`
--
ALTER TABLE `hideaccount`
  MODIFY `id_hide` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `like`
--
ALTER TABLE `like`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT untuk tabel `message`
--
ALTER TABLE `message`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `therapy`
--
ALTER TABLE `therapy`
  MODIFY `id_therapy` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- Ketidakleluasaan untuk tabel `dislike`
--
ALTER TABLE `dislike`
  ADD CONSTRAINT `dislike_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dislike_ibfk_2` FOREIGN KEY (`id_therapy`) REFERENCES `therapy` (`id_therapy`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `like`
--
ALTER TABLE `like`
  ADD CONSTRAINT `like_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `like_ibfk_2` FOREIGN KEY (`id_therapy`) REFERENCES `therapy` (`id_therapy`) ON DELETE CASCADE ON UPDATE CASCADE;

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
