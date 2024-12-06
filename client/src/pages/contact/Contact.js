import React, { useState } from "react";
import "./contact.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "../../middlewares/icons";
//
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { wait, validationSchemaMessage } from "../../utils/utils";
import { onMessaging } from "../../services/user";
import useAxiosPrivate from "../../hooks/context/state/useAxiosPrivate";
import MessageBox from "../../components/msgBox/MessageBox";

const Contact = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isSending, setIsSending] = useState(false);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchemaMessage),
  });

  const onSubmit = async (data) => {
    setIsSending(true);
    await wait(400);
    //
    onMessaging(axiosPrivate, data)
      .then((response) => {
        if (response?.data?.status) {
          setIsSending(false);
          setIsShowingMessage(true);
          setMessage({ type: "success", text: response?.data?.message });
        }
        const timer = setTimeout(() => {
          setIsShowingMessage(false);
          reset();
        }, 4000);
        return () => clearTimeout(timer);
      })
      .catch((error) => {
        setIsSending(false);
        setIsShowingMessage(true);
        if (!error?.response) {
          setMessage({ type: "warning", text: "No server response" });
        } else {
          setMessage({
            type: "error",
            text: error?.response?.data?.message,
          });
        }
        const timer = setTimeout(() => {
          setIsShowingMessage(false);
        }, 4000);
        return () => clearTimeout(timer);
      });
  };

  return (
    <>
      <Helmet>
        <title>Nos Contacts - Mariathe : Boulangerie Artisanale</title>
        <meta
          name="description"
          content="Contactez-nous facilement à travers les canaux indiqués sur le site web."
        />
      </Helmet>
      <div className="contact-wrapper">
        <Header />
        <div className="contact-body">
          <div className="contact-body-content">
            <h1 className="title t-1">Contacts</h1>
            <hr />
            <div className="cbc-wrapper">
              <div className="cbc-left">
                <h2 className="title t-2">Prendre contact avec nous</h2>
                <h3 className="title t-3">Visitez-nous</h3>
                <span>Venez nous saluer à notre bureau.</span>
                <p className="title t-4">
                  04, Av. Assossa; C. Ngiri-Ngiri; <br />
                  Ref. Lycée Movenda <br />
                  Kinshasa - RDC
                </p>
                <h3 className="title t-3">Discutez avec nous</h3>
                <span>Notre équipe amicale est là pour vous aider.</span>
                <p className="title t-4">contact@mariathe.com</p>
                <h3 className="title t-3">Appelez-nous</h3>
                <span>Lundi - Dimanche 6h00 à 22h00</span>
                <p className="title t-4">+243 83 53 17 807</p>
                <div className="social-networks">
                  <h3 className="title t-3">Réseaux Sociaux</h3>
                  <div className="sn-container">
                    <Link to="" className="link">
                      <FaFacebook className="icon" />
                    </Link>
                    <Link to="" className="link">
                      <FaLinkedin className="icon" />
                    </Link>
                    <Link to="" className="link">
                      <FaTwitter className="icon" />
                    </Link>
                    <Link to="" className="link">
                      <FaInstagram className="icon" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="cbc-right">
                {isShowingMessage && (
                  <MessageBox type={message.type} text={message.text} />
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="input-div">
                      <input
                        type="text"
                        className="input-form"
                        autoComplete="none"
                        placeholder=" "
                        {...register("firstname")}
                      />
                      <label htmlFor="firstname" className="label-form">
                        Prénom
                      </label>
                      {errors.firstname && (
                        <span className="fade-in">
                          {errors.firstname.message}
                        </span>
                      )}
                    </div>
                    <div className="input-div">
                      <input
                        type="text"
                        className="input-form"
                        autoComplete="none"
                        placeholder=" "
                        {...register("lastname")}
                      />
                      <label htmlFor="lastname" className="label-form">
                        Nom
                      </label>
                      {errors.lastname && (
                        <span className="fade-in">
                          {errors.lastname.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="input-div">
                    <input
                      type="text"
                      className="input-form"
                      autoComplete="none"
                      placeholder=" "
                      {...register("subject")}
                    />
                    <label htmlFor="subject" className="label-form">
                      Sujet
                    </label>
                    {errors.subject && (
                      <span className="fade-in">{errors.subject.message}</span>
                    )}
                  </div>
                  <div className="input-div">
                    <textarea
                      type="text"
                      className="input-textarea"
                      autoComplete="none"
                      placeholder=" "
                      rows={15}
                      {...register("message")}
                    />
                    <label htmlFor="message" className="label-form">
                      Message
                    </label>
                    {errors.message && (
                      <span className="fade-in">{errors.message.message}</span>
                    )}
                  </div>
                  {isSending ? (
                    <p>Envoi de message...</p>
                  ) : (
                    <button className="button">Envoyer Message</button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
