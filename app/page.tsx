"use client";
import styled from "styled-components";
import TitleSection from "@/components/TitleSection";
import URLForm from "@/components/URLForm";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #000000;
`;

export default function Home() {
    return (
        <Main>
            <TitleSection />
            <URLForm />
        </Main>
    );
}