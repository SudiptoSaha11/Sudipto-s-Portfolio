import { Mail, Github, Linkedin, Send, X } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const replyTemplateID = import.meta.env.VITE_EMAILJS_REPLY_TEMPLATE_ID;

export default function Contact({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    // Send email to yourself
    emailjs
      .send(
        serviceID,
        templateID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey
      )
      .then(() => {
        // Send auto-reply to user
        return emailjs.send(
          serviceID,
          replyTemplateID,
          {
            user_name: formData.name,
            user_email: formData.email,
            message: formData.message,
          },
          publicKey
        );
      })
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setStatus("Message sent successfully ✅");
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((err) => {
        console.error("FAILED...", err);
        setStatus("Failed to send ❌");
      });
  };

  return (
    <div className="min-h-screen relative overflow-auto">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1920&q=80')",
        }}
      />
      <div className="fixed inset-0 bg-black/60 -z-10" />

      {/* Glass container */}
      <div className="max-w-4xl mx-auto p-6 md:p-10">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent">
                Contact Me
              </h1>
              <p className="text-xl text-white">Let’s connect and work together</p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-[#FF0000] transition-all duration-300 border border-white/30 flex items-center gap-2 text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Contact Details */}
          <div className="mb-10 flex flex-col gap-4 text-white">
            <a
              href="mailto:sudiptosaha1111@gmail.com"
              className="flex items-center gap-3 hover:text-green-300 transition"
            >
              <Mail /> sudiptosaha1111@gmail.com
            </a>
            <a
              href="https://github.com/SudiptoSaha11"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-green-300 transition"
            >
              <Github />SudiptoSaha11
            </a>
            <a
              href="https://www.linkedin.com/in/sudipto-saha-je/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-green-300 transition"
            >
              <Linkedin /> Sudipto Saha
            </a>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 text-white">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-green-400"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-green-400"
            />
            
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message / Meeting Details"
              required
              rows="5"
              className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-green-400"
            />
            <button
              type="submit"
              disabled={status === "Sending..."}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500/80 rounded-lg hover:bg-green-600 transition-all duration-300 text-white font-semibold disabled:opacity-50 cursor-pointer"
            >
              <Send size={18} />
              Send Message
            </button>
            {status && <p className="mt-2 text-sm">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
