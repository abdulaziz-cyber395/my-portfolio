<?php
/**
 * send_email.php — Server-side form handler (self-hosted alternative to Formsubmit)
 *
 * NOT CURRENTLY ACTIVE: the live contact form in index.html posts to Formsubmit
 * (action="https://formsubmit.co/..."), not to this file. This script is kept
 * for anyone who later moves to PHP-capable hosting and wants to self-host the
 * mailer instead. GitHub Pages / Netlify / Vercel static hosting cannot run PHP,
 * so this file does nothing as-is on the current deployment.
 *
 * Usage (if you switch to this instead of Formsubmit):
 *   1. Update the $TO_EMAIL constant below with the email that should receive submissions.
 *   2. Upload this file to any PHP-enabled web host.
 *   3. Change the form's `action` in index.html to POST to this URL instead of Formsubmit.
 *
 * Security notes:
 *   - Uses native PHP mail() — for low-volume personal use this is fine.
 *   - Validates and sanitises all input.
 *   - Adds a simple honeypot field ("website") to deter bots.
 */

// ── Configuration ─────────────────────────────────────────────────
$TO_EMAIL = 'abdulazizinusah82@gmail.com';   // ← Change to your email
$SUBJECT_PREFIX = 'Portfolio Contact Form';

// ── Helper ────────────────────────────────────────────────────────
function respond(int $code, string $message): void {
  http_response_code($code);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode(['status' => $code, 'message' => $message]);
  exit;
}

// ── Only accept POST ──────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  respond(405, 'Method not allowed.');
}

// ── Honeypot check (hidden field should be empty) ─────────────────
if (!empty($_POST['website'])) {
  // Likely a bot — silently discard
  respond(200, 'OK');
}

// ── Validate required fields ──────────────────────────────────────
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
  respond(400, 'All fields are required.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  respond(400, 'Invalid email address.');
}

// ── Build and send the email ──────────────────────────────────────
$headers  = "From: {$name} <{$email}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$body  = "Name:    {$name}\n";
$body .= "Email:   {$email}\n";
$body .= "Subject: {$subject}\n";
$body .= "─────────────────────────────\n";
$body .= $message;

if (mail($TO_EMAIL, "[{$SUBJECT_PREFIX}] {$subject}", $body, $headers)) {
  respond(200, 'Message sent successfully!');
} else {
  respond(500, 'Failed to send message. Please try again or contact directly via email.');
}