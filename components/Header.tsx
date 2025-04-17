"use client";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  background-color: #bfdbfe;
  border-bottom: 2px solid #9ca3af;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Heading = styled.h1`
  font-size: 2.25rem;
  font-weight: 600;
  padding: 1rem;
  margin: 0;
  color: #000;
`;

export default function Header() {
    return (
        <HeaderWrapper>
            <Heading>CS391 URL Shortener</Heading>
        </HeaderWrapper>
    );
}