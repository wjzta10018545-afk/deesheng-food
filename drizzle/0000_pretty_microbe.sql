CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`company` text NOT NULL,
	`country` text NOT NULL,
	`business_type` text NOT NULL,
	`product` text NOT NULL,
	`packing` text NOT NULL,
	`quantity` text NOT NULL,
	`channel` text NOT NULL,
	`message` text NOT NULL,
	`landing_path` text NOT NULL,
	`source` text NOT NULL,
	`medium` text NOT NULL,
	`campaign` text NOT NULL,
	`referrer_host` text NOT NULL,
	`status` text DEFAULT 'prepared' NOT NULL
);
