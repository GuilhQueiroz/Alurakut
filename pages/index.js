import React from 'react';
import MainGrid from '../src/components/MainGrid/'
import Box from '../src/components/Box';
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault , OrkutNostalgicIconSet} from '../src/lib/alurakutCommons'
import {ProfileRelationsBoxWrapper} from '../src/components/profileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img className="userFoto" src={`https://github.com/${propriedades.githubUser}.png`} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>

        </a>
      </p>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}


export default function Home() {
  const usuarioAleatorio = "Gui-guimaraes";
  const [comunidades, setComunidades] = React.useState([{
    id: '15334848641056686652676682',
    title: `Eu odeio acordar cedo`,
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  return (
    <>
      <AlurakutMenu />
        <MainGrid>
          <div className="profileArea" style={{gridArea: 'profileArea'}}>
            <ProfileSidebar githubUser={usuarioAleatorio} />
          </div>
          <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
            <Box>
              <form onSubmit={function handleCreateCommunity(e) {
                e.preventDefault(e)

                const dadosDoForm = new FormData(e.target);

                const comunidade = {
                  id: new Date().toISOString,
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image')
                }

                const comunidadesAtualizadas = [...comunidades, 'AluraStars'];
                setComunidades(comunidadesAtualizadas);
              }}>
                <div>
                <img src={`https://github.com/${usuarioAleatorio}.png`} style={{borderRadius: '50%', width: '40px', marginRight: 'auto'}} />
                </div>
                <div className="createPub">
                  <button id="myBtn" style={{width: '100%', display: 'block', marginTop: '-40px', padding: '12px', background: '#F4F4F4', border: 0, color: '#333333'}}>
                    Começar Publicação
                  </button>
                  <hr />
                  <OrkutNostalgicIconSet />
                </div>
              </form>
            </Box>
            <hr />
          </div>
          <div className="profileRelations" style={{gridArea: 'profileRelationsArea'}}>
            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Pessoas da comunidade ({pessoasFavoritas.length})
              </h2>

              <ul>
                {pessoasFavoritas.map((itemAtual) => {
                  return (
                    <li key={itemAtual}>
                      <a href={`/users/${itemAtual}.png`} >
                        <img src={`https://github.com/${itemAtual}.png`} />
                        <span>{itemAtual}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>

            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Comunidades ({comunidades.length})
              </h2>

              <ul>
                {comunidades.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`/users/${itemAtual.title}`} >
                        <img src={itemAtual.image} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>
          </div>
        </MainGrid>
    </>
  )
}


