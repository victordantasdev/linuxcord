/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Box, Button, Text, TextField, Image,
} from '@skynexui/components';
import { ForkMe } from 'fork-me-corner';
import appConfig from '../config.json';
import { Props } from '../types/DefaultTypes';

const Title = ({ children, tag }: Props) => {
  const Tag = tag || 'h1';
  return (
    <>
      <style jsx>
        {`
      ${tag} {
        color: ${appConfig.theme.colors.neutrals['000']};
        font-size: 24px;
        font-weight: 600px;
      }
    `}
      </style>

      <Tag>{children}</Tag>
    </>
  );
};

const PaginaInicial: NextPage = () => {
  const [username, setUsername] = useState<string>('');
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());
  const roteamento = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, [time]);

  return (
    <>
      <ForkMe
        repo="https://github.com/victordantasdev/aluracord-linux"
      />
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100vh',
        }}
      >
        {/* timezone */}

        <Text
          variant="heading4"
          styleSheet={{
            marginTop: '16px',
            color: appConfig.theme.colors.neutrals[100],
          }}
        >
          {time}
        </Text>

        {/* timezone */}

        {/* login area */}
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box>
            {/* Photo Area */}
            <Box
              styleSheet={{
                width: '200px',
                height: '200px',
                padding: '2px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '1000px',
                flex: 1,
                // @ts-ignore
                filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))',
              }}
            >
              {username.length > 2 ? (
                <Image
                  styleSheet={{
                    borderRadius: '50%',
                    marginBottom: '16px',
                  }}
                  src={`https://github.com/${username}.png`}
                />
              ) : (
                <Image
                  styleSheet={{
                    borderRadius: '50%',
                    marginBottom: '16px',
                  }}
                  src="/images/user.png"
                />
              )}
            </Box>
            {/* Photo Area */}
          </Box>

          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%',
              maxWidth: '700px',
              borderRadius: '5px',
              padding: '32px',
              margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              tag="form"
          // @ts-ignore
              onSubmit={(e: HTMLFormElement) => {
                e.preventDefault();
                roteamento.push(`/chat?username=${username}`);
              }}
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: '100%', sm: '50%' },
                textAlign: 'center',
                marginBottom: '32px',
              }}
            >
              <Title tag="h2">Boas vindas de volta!</Title>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {`${appConfig.name} - ${appConfig.description}`}
              </Text>

              <TextField
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                placeholder="Digite seu usuário do GitHub aqui..."
            // @ts-ignore
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />
              <Button
                disabled={username.length < 2 && true}
                type="submit"
                label="Entrar"
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals['000'],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
          </Box>
        </Box>
        {/* login area */}

        {/* logo */}
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
          }}
        >
          <Image
            styleSheet={{
              width: '100px',
              height: '100px',
              borderRadius: '1000px',
              // @ts-ignore
              filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))',
            }}
            src="/images/tux_logo.png"
          />
          <Text
            variant="heading3"
            styleSheet={{
              marginLeft: '16px',
              color: appConfig.theme.colors.neutrals[100],
              // @ts-ignore
              filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))',
            }}
          >
            {appConfig.name}
          </Text>
        </Box>
        {/* logo */}
      </Box>
    </>
  );
};

export default PaginaInicial;
