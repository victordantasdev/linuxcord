/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Box, Button, Text, TextField, Image,
} from '@skynexui/components';
import { FaUsers } from 'react-icons/fa';
import appConfig from '../config.json';
import { DataProps, Props } from '../types/main';

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
  const roteamento = useRouter();
  const [data, setData] = useState<DataProps>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (username.length < 3) return;

    setLoading(true);
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((dataFromAPI) => {
        setData(dataFromAPI);
        setLoading(false);
      });
  }, [username]);

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        // @ts-ignore
        backgroundImage: 'url(/linux-bg.jpeg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
            roteamento.push('/chat');
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
            {appConfig.name}
          </Text>

          <TextField
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
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

        {/* Photo Area */}
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '200px',
            padding: '16px',
            backgroundColor: appConfig.theme.colors.neutrals[800],
            border: '1px solid',
            borderColor: appConfig.theme.colors.neutrals[999],
            borderRadius: '10px',
            flex: 1,
            // @ts-ignore
            filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))',
            minHeight: '240px',
          }}
        >
          {username.length > 2 && (
          <>
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {loading && (
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: '3px 10px',
                    marginRight: '5px',
                    borderRadius: '1000px',
                  }}
                >
                  Loading...
                </Text>
              )}

              {!loading && (
                <>
                  <Text
                    variant="body4"
                    styleSheet={{
                      color: appConfig.theme.colors.neutrals[200],
                      backgroundColor: appConfig.theme.colors.neutrals[900],
                      padding: '3px 10px',
                      marginRight: '5px',
                      borderRadius: '1000px',
                    }}
                  >
                    {username}
                  </Text>

                  <Text
                    variant="body4"
                    styleSheet={{
                      color: appConfig.theme.colors.neutrals[200],
                      backgroundColor: appConfig.theme.colors.neutrals[900],
                      padding: '3px 10px',
                      borderRadius: '1000px',
                    }}
                  >
                    <FaUsers />
                    {' '}
                    {data?.followers}
                  </Text>
                </>
              )}
            </Box>
          </>
          )}
        </Box>
        {/* Photo Area */}
      </Box>
    </Box>
  );
};

export default PaginaInicial;
