"use client";
import React from "react";
import usePlayerStore from "@/lib/store";
import { BiSolidError } from "react-icons/bi";
import { FaPlug } from "react-icons/fa";

const ErrorMessage: React.FC = () => {
  const errors = usePlayerStore((state) => state.errors);
  const { tryAgain } = usePlayerStore();

  return (
    <section className="player-errors flex-1 text-center">
      <div className="push-bottom fx fx-drop-in fx-delay-1">
        <FaPlug className="ico text-huge" />
      </div>
      <div className="fx fx-slide-up fx-delay-2">
        <h3>{"Oops, there's a problem!"}</h3>
      </div>
      <hr />
      {Object.entries(errors).map((e, i) => (
        <div className={`push-bottom fx fx-slide-up fx-delay-${i + 3}`} key={i}>
          <span className="text-primary">{`${e[0]} : ${e[1]}`}</span>
        </div>
      ))}
      <hr />
      <button
        className="cta-btn text-nowrap focus-box fx fx-slide-up fx-delay-4"
        type="button"
        onClick={() => tryAgain()}>
        <BiSolidError className="ico" />
        &nbsp; Try again
      </button>
    </section>
  );
};

export default ErrorMessage;
