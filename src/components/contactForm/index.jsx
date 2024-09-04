import { useState } from "react";
import emailjs from "@emailjs/browser";

import './styles.css';

const ContactForm = () => {
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		message: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(formData);

		emailjs
			.send(
				"service_g53ixhk",
				"template_2rsbimx",
				formData,
				"AOji-Dze61elnBFQK"
			)
			.then(
				(result) => {
					console.log(result.text);
					alert("Message sent successfully!");
				},
				(error) => {
					console.log(error.text);
					alert("Failed to send message, please try again.");
				}
			);
	};

	return (
		<div className="contact-form-content">
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
				<button type="submit">SEND</button>
			</form>
		</div>
	);
};

export default ContactForm;
