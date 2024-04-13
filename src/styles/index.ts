import styled, { createGlobalStyle } from 'styled-components'
import variaveis from './variaveis'

const EstiloGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    boxisizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;
  }
`

// container para toda a aplicação
export const Container = styled.div`
  display: grid;
  grid-template-columns: 224px auto;
`
export const MainContainer = styled.main`
  padding: 0 40px;

  height: 100vh;

  // todo o conteúdo que ultrapassar os 100vh será ocultado e acessado via scroll
  // y é o scroll na vertical
  // overflow sem x e y vale para horizontal e vertical
  overflow-y: scroll;
`
export const Titulo = styled.h2`
  display: block;
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: bold;
`

export const Campo = styled.input`
  padding: 8px;
  background-color: #fff;
  border-radius: 8px;
  font-weight: bold;
  color: #666666;
  border-color: #666666;
  width: 90%;
`
export const Botao = styled.button`
  padding: 8px 12px;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  border: none;
  cursor: pointer;
  background-color: ${variaveis.preto};
  border-radius: 8px;
  margin-right: 8px;
`

export const BotaoSalvar = styled(Botao)`
  background-color: ${variaveis.verde};
`

export default EstiloGlobal
