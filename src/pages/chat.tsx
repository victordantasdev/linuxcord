/* eslint-disable import/extensions */
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Box, Text, TextField, Image, Button,
} from '@skynexui/components';
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
  mensagens,
  setListaDeMensagens,
}: {
    mensagens: Array<MensagemProps>,
    setListaDeMensagens: Dispatch<SetStateAction<MensagemProps[]>>
  }) => {
  const handleRemove = (id: number) => {
    const newMsg = mensagens.filter((m) => m.id !== id);
    setListaDeMensagens(newMsg);
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
      {mensagens.map((mensagem) => (
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
          </Box>
          {mensagem.texto}
        </Text>
      ))}
    </Box>
  );
};

const ChatPage = () => {
  const [mensagem, setMensagem] = useState<string | undefined>();
  const [listaDeMensagens, setListaDeMensagens] = useState<Array<MensagemProps>>([]);

  const handleNovaMensagem = (novaMensagem: string | undefined) => {
    const msg = {
      id: listaDeMensagens.length + 1,
      de: 'victordantasdev',
      texto: novaMensagem,
    };

    setListaDeMensagens([
      msg,
      ...listaDeMensagens,
    ]);
    setMensagem('');
  };

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
            mensagens={listaDeMensagens}
            setListaDeMensagens={setListaDeMensagens}
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

export default ChatPage;
