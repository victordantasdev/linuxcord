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
// import ButtonSendSticker from '../components/ButtonSendSticker';

const Header = () => {
  const router = useRouter();
  const { query } = useRouter();

  return (
    <Box styleSheet={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: '16px',
      color: appConfig.theme.colors.neutrals[100],
    }}
    >
      <Text
        variant="heading3"
      >
        {`Logado como ${query.username}`}
      </Text>
      <button
        type="button"
        onClick={() => router.push('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          border: 'none',
          borderRadius: '50%',
          color: '#fff',
          fontSize: '24px',
          fontWeight: 'bold',
          backgroundColor: '#E96E1F',
          cursor: 'pointer',
        }}
      >
        x
      </button>
    </Box>
  );
};

const MessageList = ({
  loading,
  userName,
  supabaseClient,
  listaDeMensagens,
  setListaDeMensagens,
}: {
    loading: boolean,
    supabaseClient: SupabaseClient,
    userName: string | string[] | undefined,
    listaDeMensagens: Array<MensagemProps> | any[] | null,
    setListaDeMensagens: Dispatch<SetStateAction<MensagemProps[] | any[] | null>>
  }) => {
  const { query } = useRouter();

  const handleRemove = async (msgID: number) => {
    const novasMensagens = listaDeMensagens!.filter((m) => m.id !== msgID);
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
        padding: '0 16px',
        marginBottom: '16px',
        color: appConfig.theme.colors.neutrals['000'],
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
            LOADING...
          </Box>
        </Text>
      )}

      {listaDeMensagens!.map((mensagem: MensagemProps) => (
        <Text
          key={mensagem.id}
          tag="li"
          styleSheet={{
            // @ts-ignore
            alignSelf: query.username === mensagem.de ? 'flex-end' : 'flex-start',
            borderRadius: query.username === mensagem.de ? '8px 8px 0 8px' : '8px 8px 8px 0',
            padding: '6px',
            marginBottom: '12px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            hover: {
              backgroundColor: appConfig.theme.colors.neutrals[700],
            },
          }}
          data-value={`data-value-${mensagem.id}`}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '6px',
              marginBottom: '8px',
              // @ts-ignore
              borderBottom: `1px solid ${appConfig.theme.colors.neutrals[500]}`,
            }}
          >
            <Box
              styleSheet={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                styleSheet={{
                  width: '25px',
                  height: '25px',
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
              <Text tag="strong" styleSheet={{ }}>
                <a
                  href={`https://github.com/${mensagem.de}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    textDecoration: 'none',
                    color: appConfig.theme.colors.neutrals[100],
                  }}
                >
                  {mensagem.de}
                </a>
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
              <Box styleSheet={{ marginLeft: '16px' }}>
                <Button
                  size="xs"
                  variant="primary"
                  colorVariant="negative"
                  label="$ rm -rf"
                  onClick={() => handleRemove(mensagem.id)}
                />
              </Box>
            )}
          </Box>
          {mensagem.texto!.startsWith(':sticker:') ? (
            <Image src={mensagem.texto?.replace(':sticker:', '')} />
          ) : (
            mensagem.texto
          )}
        </Text>
      ))}
    </Box>
  );
};

const ChatPage = ({
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
}: {
    SUPABASE_URL: string
    SUPABASE_ANON_KEY: string,
  }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string | undefined>();
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());
  const [listaDeMensagens, setListaDeMensagens] = useState<Array<MensagemProps> | any[] | null>([]);
  const { query } = useRouter();

  const handleNovaMensagem = (novaMensagem: string | undefined) => {
    const msg = {
      de: query.username,
      texto: novaMensagem,
    };

    supabaseClient
      .from('mensagens')
      .insert([msg])
      .then(() => {
        setLoading(false);
      });
    setMensagem('');
  };

  /*
    escutaMensagensEmTempoReal é uma função que recebe outra função como parâme-
    tro e quando é chamada executa a função passada por parâmetro

    const f = (x: Function) => x();
  */
  const escutaMensagensEmTempoReal = (
    adicionaMensagem: Function,
    atualizaMensagemDeletada: Function,
  ) => {
    supabaseClient
      .from('mensagens')
      .on('INSERT', (resIns) => adicionaMensagem(resIns.new))
      .on('DELETE', (resDel) => atualizaMensagemDeletada(resDel.old.id))
      .subscribe();
  };

  useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setListaDeMensagens(data);
      });

    escutaMensagensEmTempoReal((novaMensagem: MensagemProps) => {
      setListaDeMensagens((valorAtualDaLista) => [
        novaMensagem,
        ...valorAtualDaLista as Array<MensagemProps>,
      ]);
    }, (id: number) => {
      setListaDeMensagens((valorAtualDaLista) => {
        const novasMensagens = valorAtualDaLista!.filter((m) => m.id !== id);
        return novasMensagens;
      });
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, [time]);

  return (
    <Box
      styleSheet={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100vh',
        // @ts-ignore
        backdropFilter: 'blur(8px)',
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          color: appConfig.theme.colors.neutrals[100],
          backgroundColor: appConfig.theme.colors.neutrals[700],
        }}
      >
        <Text variant="heading5">{time}</Text>
      </Box>

      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
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
            padding: '16px',
            marginLeft: '16px',
            overflow: 'hidden',
          }}
        >
          <Header />
          <Box
            styleSheet={{
              position: 'relative',
              display: 'flex',
              // alignItems: 'center',
              justifyContent: 'center',
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
              userName={query.username}
              listaDeMensagens={listaDeMensagens}
              supabaseClient={supabaseClient}
              setListaDeMensagens={setListaDeMensagens}
            />
            <Box
              tag="form"
              styleSheet={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '16px',
              }}
            >
              <Box
                styleSheet={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  marginRight: '12px',
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                }}
              >
                <Text
                  variant="body1"
                  styleSheet={{
                    margin: '0 16px',
                  }}
                >
                  $
                </Text>
                {/* @ts-ignore */}
                <TextField
                  value={mensagem}
                  onChange={(e) => {
                    setMensagem(e.target.value);
                  }}
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
                    border: 'none',
                  }}
                />
              </Box>
              {/* <ButtonSendSticker
              onStickerClick={(sticker: string) => handleNovaMensagem(`:sticker: ${sticker}`)}
            /> */}
            </Box>
          </Box>
        </Box>

        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            borderRadius: '5px',
            backgroundColor: appConfig.theme.colors.neutrals[700],
            height: '100%',
            // @ts-ignore
            maxHeight: '95vh',
            padding: '16px',
            overflow: 'hidden',
            margin: '0 16px',
            width: '20%',
          }}
        >
          <Box
            tag="ul"
            styleSheet={{
              display: 'flex',
              // @ts-ignore
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              flex: 1,
              paddingTop: '16px',
              overflow: 'auto',
            }}
          >
            {appConfig.stickers.map((sticker) => (
              <Text
                // @ts-ignore
                onClick={(e) => {
                  handleNovaMensagem(`:sticker: ${e.target.currentSrc}`);
                }}
                tag="li"
                key={sticker}
                styleSheet={{
                  width: '50%',
                  borderRadius: '5px',
                  padding: '10px',
                  focus: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                  },
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[600],
                  },
                }}
              >
                <Image src={sticker} />
              </Text>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { SUPABASE_ANON_KEY, SUPABASE_URL } = process.env;

  // const userData = await fetch(`https://api.github.com/users/${ctx.query.username}`)
  //   .then((res) => res.json())
  //   .then((data) => data);

  return {
    props: {
      SUPABASE_ANON_KEY,
      SUPABASE_URL,
      // userData,
    },
  };
};

export default ChatPage;
