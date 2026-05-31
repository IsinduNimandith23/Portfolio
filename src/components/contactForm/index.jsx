import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

import './styles.css';

const ContactForm = () => {
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		message: "",
	});
	const [isSending, setIsSending] = useState(false);
	// popup = { type: "success" | "error", title: string, message: string } | null
	const [popup, setPopup] = useState(null);

	// Close the popup on Escape for accessibility.
	useEffect(() => {
		if (!popup) return;
		const onKey = (e) => e.key === "Escape" && setPopup(null);
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [popup]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSending(true);

		// Template params. The keys here must match the {{variables}} used in the
		// EmailJS template. We include several common aliases so the template's
		// "To Email", "Reply To" and body fields all resolve correctly.
		const templateParams = {
			firstname: formData.firstname,
			lastname: formData.lastname,
			from_name: `${formData.firstname} ${formData.lastname}`.trim(),
			email: formData.email,
			reply_to: formData.email,
			message: formData.message,
		};

		emailjs
			.send(
				"service_g53ixhk",
				"template_2rsbimx",
				templateParams,
				"AOji-Dze61elnBFQK"
			)
			.then(
				(result) => {
					console.log("EmailJS success:", result.status, result.text);
					setPopup({
						type: "success",
						title: "Message Sent",
						message:
							"Thanks for reaching out! I'll get back to you as soon as I can.",
					});
					setFormData({ firstname: "", lastname: "", email: "", message: "" });
				},
				(error) => {
					// Log the full error so the real cause (e.g. recipient empty,
					// invalid key, blocked origin) is visible in the console.
					console.error("EmailJS error:", error);
					setPopup({
						type: "error",
						title: "Something Went Wrong",
						message:
							"Your message couldn't be sent right now. Please try again in a moment.",
					});
				}
			)
			.finally(() => setIsSending(false));
	};

	return (
		<div className="contact-form-content">
			{popup && (
				<div
					className="form-popup-overlay"
					onClick={() => setPopup(null)}
				>
					<div
						className={`form-popup form-popup--${popup.type}`}
						role="dialog"
						aria-modal="true"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							type="button"
							className="form-popup__close"
							aria-label="Close"
							onClick={() => setPopup(null)}
						>
							✕
						</button>
						<div className="form-popup__icon">
							{popup.type === "success" ? "✓" : "!"}
						</div>
						<h4 className="form-popup__title">{popup.title}</h4>
						<p className="form-popup__message">{popup.message}</p>
						<button
							type="button"
							className="form-popup__action"
							onClick={() => setPopup(null)}
						>
							{popup.type === "success" ? "Great" : "Try Again"}
						</button>
					</div>
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<div className="name-container">
					<input
						type="text"
						name="firstname"
						placeholder="First Name"
						value={formData.firstname}
						onChange={handleChange}
						required
					/>
					<input
						type="text"
						name="lastname"
						placeholder="Last Name"
						value={formData.lastname}
						onChange={handleChange}
						required
					/>
				</div>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<textarea
					name="message"
					placeholder="Message"
					rows={3}
					value={formData.message}
					onChange={handleChange}
					required></textarea>
				<button type="submit" disabled={isSending}>
					{isSending ? "SENDING..." : "SEND"}
				</button>
			</form>
		</div>
	);
};

export default ContactForm;
