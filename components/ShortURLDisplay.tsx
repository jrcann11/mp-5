"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Alert, IconButton, Tooltip, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StyledLink = styled(Link)`
  text-decoration: underline;
  margin-left: 6px;
  color: inherit;
`;

export default function ShortURLDisplay({ shortURL }: { shortURL: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(shortURL);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <Alert
            severity="success"
            action={
                copied ? (
                    <Tooltip title="Copied!">
                        <IconButton color="inherit" disabled>
                            <CheckCircleIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Copy to clipboard">
                        <IconButton color="inherit" onClick={handleCopy}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Tooltip>
                )
            }
        >
            <Typography component="span">
                Shortened URL:
                <StyledLink href={shortURL} target="_blank" rel="noopener noreferrer">
                    {shortURL}
                </StyledLink>
            </Typography>
        </Alert>
    );
}