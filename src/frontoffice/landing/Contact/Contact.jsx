import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="section hero-section">
      <div className="contact-box">
        <div className=" info">
          <p>prediididd</p>
        </div>
        <div className="input-form">
          <form action="">
            <div>
              <label htmlFor="name">Votre nom</label>
              <input type="text" required name="name" id="name" />
            </div>

            <div>
              <label htmlFor="email">Votre email</label>
              <input type="email" required name="email" id="email" />
            </div>

            <div>
              <label htmlFor="sujet">sujet</label>
              <input type="text" required name="sujet" id="sujet" />
            </div>

            <div>
              <label htmlFor="message">message</label>
              <textarea
                type="text"
                required
                name="message"
                id="message"
                rows={3}
                cols={4}
              />
            </div>

            <div className="flex-row justify-center text-center">
              <button type="submit" className=" mx-auto  p-3 text-center">
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
