import { View, Text } from "react-native";
import React from "react";
import TextScreen from "@/components/TextScreen";

const PrivacyPolicy = () => {
  const markdown = `## Política de Privacidade

**Última atualização:** 10 de setembro de 2024

Esta Política de Privacidade descreve como coletamos, usamos e protegemos as informações pessoais fornecidas pelos usuários ao se cadastrar e utilizar o nosso aplicativo de doações solidárias.

### 1. Coleta de Dados Pessoais
Ao se cadastrar no nosso aplicativo, coletamos as seguintes informações:

- Nome completo
- Telefone
- Endereço de e-mail
- Senha

Esses dados são essenciais para o funcionamento do aplicativo e para permitir que você participe do processo de doação.

### 2. Uso das Informações
As informações coletadas são utilizadas para:

- Gerenciar seu cadastro e autenticar seu acesso ao aplicativo;
- Facilitar a comunicação entre doadores e receptores;
- Enviar notificações relacionadas às doações e atualizações do aplicativo;
- Garantir a segurança e a integridade do sistema.

Não compartilhamos suas informações pessoais com terceiros para fins comerciais.

### 3. Armazenamento e Segurança
Nos comprometemos a proteger suas informações pessoais utilizando medidas de segurança adequadas. As informações de cadastro, incluindo a senha, são armazenadas de forma criptografada e acessíveis apenas por você.

### 4. Seus Direitos
Você tem o direito de:

- Acessar, corrigir ou excluir suas informações pessoais;
- Solicitar a exclusão da sua conta a qualquer momento.

Para exercer esses direitos, entre em contato conosco pelo e-mail [Seu e-mail].

### 5. Alterações na Política de Privacidade
Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer mudanças significativas por e-mail ou através do próprio aplicativo.
`;

  return (
    <TextScreen markdown={markdown} />
  );
};

export default PrivacyPolicy;
