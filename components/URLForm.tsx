"use client";

import { useState} from "react";
import createAlias from "@/lib/createAlias";
import { Button, TextField, Alert, CircularProgress } from "@mui/material";
import styled from "styled-components";
import ShortURLDisplay from "@/components/ShortURLDisplay";

const StyledForm = styled.form`
    background-color: #eff6ff;
    border: 2px solid #d1d5db;
    border-radius: 1rem;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    width: 100%;
    max-width: 36rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ButtonContent = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function URLForm() {
    const [alias, setAlias] = useState("");
    const [url, setUrl] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [shortURL, setShortURL] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setShortURL(null);
        setIsLoading(true);

        try {
            const mapping = await createAlias(alias, url);
            setShortURL(`${window.location.origin}/${mapping.alias}`);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <TextField
                label="Alias (e.g. my-link)"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                fullWidth
                required
                variant="outlined"
            />
            <TextField
                label="Long URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                fullWidth
                required
                variant="outlined"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isLoading}
            >
                {isLoading ? (
                    <ButtonContent>
                        <CircularProgress size={20} color="inherit" />
                        Shortening...
                    </ButtonContent>
                ) : (
                    "Shorten"
                )}
            </Button>

            {error && <Alert severity="error">{error}</Alert>}
            {shortURL && <ShortURLDisplay shortURL={shortURL} />}
        </StyledForm>
    );
}