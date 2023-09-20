import styled from "styled-components";
import media from "styled-media-query";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { Suspense, useEffect, useRef, useState } from "react";
import groovyWalkAnimation from "@/assets/json/menu_icon.json";

const CommonHeader = () => {
  const menuRef = useRef<LottieRefCurrentProps>(null!);
  const [isOpen, setIsOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(true);

  const toggleMenu = () => {
    setIsComplete(false);
    if (isOpen) {
      menuRef.current.setDirection(-1);
    } else {
      menuRef.current.setDirection(1);
    }
    setIsOpen(!isOpen);
    menuRef.current.play();
  };

  return (
    <Header>
      <div className={`header-nav ${isOpen ? "open" : "close"}`}>
        <h1>
          <a href="/">Satofactoin.net</a>
        </h1>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/portfolio">Portfolio</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>

      <button className="menu-btn" onClick={toggleMenu} disabled={!isComplete}>
        <Lottie
          lottieRef={menuRef}
          animationData={groovyWalkAnimation}
          loop={false}
          autoplay={false}
          onComplete={() => setIsComplete(true)}
        />
      </button>
    </Header>
  );
};

const Header = styled.header`
  position: relative;
  .header-nav {
    display: flex;
    width: 100%;
    padding: var(--spacing-XL);
    box-sizing: border-box;
    position: fixed;
    z-index: 100;
    font-family: var(--font-family-oswald);
    align-items: center;

    ${media.lessThan("medium")`
      padding: var(--spacing-L);
      transition: 0.5s ease; 

      &.open {
        padding: var(--spacing-L);
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: var(--color-white);
        width: 100%;
      }
      &.close {
        display: block;
        width: 0;
        height: 100%;
        padding: 0;
        nav {
          display: none;
        }
      }
   `}
    h1 {
      font-weight: 700;
      font-size: var(--font-size-XL);
      letter-spacing: 0.03em;
      ${media.lessThan("medium")`
      padding: var(--spacing-L);
      `}
    }
    nav {
      margin-left: auto;
      ul {
        display: flex;
        li {
          margin-left: var(--spacing-XL);
          letter-spacing: 0.05em;
          font-weight: 400;
          font-size: var(--font-size-M);
        }
      }
      ${media.lessThan("medium")`
      ul {
        display: block;
        padding: var(--spacing-L);
        text-align: left;
        li {
          font-size: var(--font-size-L);
          margin: 0 0 var(--spacing-M) 0;
        }
      }

    `}
    }
  }
  .menu-btn {
    display: none;
    ${media.lessThan("medium")`
        display: block;
        position: fixed;
        top: var(--spacing-L);
        right: var(--spacing-L);
        cursor: pointer;
        z-index: 100;
    `}
  }
`;

export default CommonHeader;
