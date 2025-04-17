"use client";
import styled from "styled-components";

const Section = styled.section`
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 2rem;
  padding: 0 1rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #000;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #374151;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
`;

export default function TitleSection() {
    return (
        <Section>
            <Title>Shorten a URL</Title>
            <Subtitle>
                Shorten your long URL into a compact, shareable link!
            </Subtitle>
        </Section>
    );
}