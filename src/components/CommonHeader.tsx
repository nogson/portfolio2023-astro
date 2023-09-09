import styled from "styled-components";
import media from "styled-media-query";

import { Suspense, useEffect, useRef, useState } from "react";

const CommonHeader = () => {
  return (
    <Header>
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
            <a href="/blog">Bolg</a>
          </li>
          <li>Contact</li>
        </ul>
        <div className="menu-btn"></div>
      </nav>
    </Header>
  );
};

const Header = styled.header`
  width: 100%;
  padding: var(--spacing-XL);
  box-sizing: border-box;
  position: fixed;
  z-index: 100;
  font-family: var(--font-family-oswald);
  display: flex;
  align-items: center;
  padding-bottom: var(--spacing-XL);
  ${media.lessThan("medium")`
    padding: var(--spacing-L);
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: var(--color-white);
  `}
  h1 {
    font-weight: 700;
    font-size: var(--font-size-L);
    letter-spacing: 0.03em;
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
    .menu-btn {
      display: none;
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
      .menu-btn {
        display: block;
        position: absolute;
        top: var(--spacing-L);
        right: var(--spacing-L);
        cursor: pointer;
      }
    `}
  }
`;

export default CommonHeader;
