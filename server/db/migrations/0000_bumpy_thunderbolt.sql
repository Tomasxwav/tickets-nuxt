CREATE TABLE `tickets_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`status` text NOT NULL,
	`priority` text NOT NULL,
	`requestor` text NOT NULL,
	`department` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
