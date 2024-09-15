import React from "react";
import TextScreen from "@/components/TextScreen";

const Terms = () => {
  const markdown = `## Termos de Uso

**Última atualização:** 10 de setembro de 2024

Ao utilizar o nosso aplicativo de doações solidárias, você concorda com os seguintes Termos de Uso. Leia-os atentamente antes de se cadastrar.

### 1. Cadastro
Para utilizar o aplicativo, você deve fornecer informações precisas e completas, incluindo nome completo, telefone, e-mail e senha. O uso do aplicativo é gratuito e não envolve transações financeiras.

### 2. Uso do Aplicativo
O aplicativo foi criado para facilitar doações solidárias, sem troca de dinheiro. Você concorda em usar o aplicativo de acordo com sua finalidade, respeitando os outros usuários e as regras estabelecidas.

### 3. Responsabilidade
O aplicativo é uma plataforma de intermediação entre doadores e receptores. Não nos responsabilizamos pela qualidade ou condições dos itens doados.

### 4. Segurança da Conta
Você é responsável por manter a confidencialidade da sua senha e por todas as atividades que ocorram sob sua conta. Informe-nos imediatamente em caso de uso não autorizado da sua conta.

### 5. Modificações nos Termos de Uso
Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento. As alterações serão notificadas através do aplicativo ou por e-mail.

### 6. Encerramento de Conta
Podemos suspender ou encerrar seu acesso ao aplicativo se detectarmos violação dos Termos de Uso ou uso inadequado da plataforma.
`;

  return (
    <TextScreen markdown={markdown}/>
  );
};


export default Terms;
