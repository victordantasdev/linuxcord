/* eslint-disable prefer-destructuring */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/extensions */
import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import {
  Box, Text, TextField, Image, Button,
} from '@skynexui/components';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { MensagemProps } from '../types/DefaultTypes';

const Header = () => (
  <Box styleSheet={{
    width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  }}
  >
    <Text variant="heading5">
      Chat
    </Text>
    <Button
      variant="tertiary"
      // @ts-ignore
      colorVariant="neutral"
      label="Logout"
      href="/"
    />
  </Box>
);

const MessageList = ({
  loading,
  userName,
  mensagens,
  supabaseClient,
  setListaDeMensagens,
}: {
    loading: boolean,
    supabaseClient: SupabaseClient,
    userName: string | string[] | undefined,
    mensagens: Array<MensagemProps> | any[] | null,
    setListaDeMensagens: Dispatch<SetStateAction<MensagemProps[] | any[] | null>>
  }) => {
  const handleRemove = async (msgID: number) => {
    const novasMensagens = mensagens!.filter((m) => m.id !== msgID);
    setListaDeMensagens(novasMensagens);

    await supabaseClient
      .from('mensagens')
      .delete()
      .match({ id: msgID });
  };

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px',
      }}
    >
      {loading && (
        <Text
          tag="li"
          styleSheet={{
            borderRadius: '5px',
            padding: '6px',
            marginBottom: '12px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            hover: {
              backgroundColor: appConfig.theme.colors.neutrals[700],
            },
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <Box>
              {/* <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src=""
              /> */}
              {/* <Text tag="strong" /> */}
              {/* <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {(new Date().toLocaleDateString())}
              </Text> */}
            </Box>

          </Box>
          LOADING...
        </Text>
      )}

      {mensagens!.map((mensagem) => (
        <Text
          key={mensagem.id}
          tag="li"
          styleSheet={{
            borderRadius: '5px',
            padding: '6px',
            marginBottom: '12px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            hover: {
              backgroundColor: appConfig.theme.colors.neutrals[700],
            },
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <Box>
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                  transition: 'all 600ms ease-in-out',
                  hover: {
                    // @ts-ignore
                    transform: 'scale(1.5)',
                  },
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">
                {mensagem.de}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {(new Date().toLocaleDateString())}
              </Text>
            </Box>

            {mensagem.de === userName && (
              <Box>
                <Button
                  size="xs"
                  variant="primary"
                  colorVariant="negative"
                  label="Delete"
                  iconName="FaTrashAlt"
                  onClick={() => handleRemove(mensagem.id)}
                />
              </Box>
            )}
          </Box>
          {mensagem.texto}
        </Text>
      ))}
    </Box>
  );
};

const ChatPage = ({
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
}: {
    SUPABASE_ANON_KEY: string,
    SUPABASE_URL: string
  }) => {
  const [mensagem, setMensagem] = useState<string | undefined>();
  const [listaDeMensagens, setListaDeMensagens] = useState<Array<MensagemProps> | any[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { query } = useRouter();

  useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setListaDeMensagens(data);
      });
  }, []);

  const handleNovaMensagem = (novaMensagem: string | undefined) => {
    const msg = {
      de: query.username,
      texto: novaMensagem,
    };

    supabaseClient
      .from('mensagens')
      .insert([msg])
      .then(({ data }) => {
        setLoading(false);
        setListaDeMensagens([
          data![0],
          ...listaDeMensagens as Array<MensagemProps>,
        ]);
      });
    setMensagem('');
  };

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: appConfig.theme.colors.primary[500],
        // @ts-ignore
        backgroundImage: 'url(/images/linux-bg.jpeg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000'],
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          // @ts-ignore
          maxHeight: '95vh',
          padding: '32px',
          overflow: 'hidden',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >
          <MessageList
            loading={loading}
            mensagens={listaDeMensagens}
            supabaseClient={supabaseClient}
            setListaDeMensagens={setListaDeMensagens}
            userName={query.username}
          />
          <Box
            tag="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* @ts-ignore */}
            <TextField
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  setLoading(true);
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { SUPABASE_ANON_KEY, SUPABASE_URL } = process.env;

  return {
    props: {
      SUPABASE_ANON_KEY,
      SUPABASE_URL,
    },
  };
};

export default ChatPage;
