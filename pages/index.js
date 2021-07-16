import React from 'react';
import MainGrid from '../src/components/MainGrid/'
import Box from '../src/components/Box';
import { communities } from '../src/components/Comunidades';
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

function ProfileRelationsBox(prop) {
  return (
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {prop.title} ({prop.items.length})
    </h2>

    <ul>
      { /* seguidores.map((itemAtual, i) => {

        if (i < 6) return (
          <li key={itemAtual}>
            <a href={`/users/${itemAtual}.png`} >
              <img src={`https://github.com/${itemAtual}.png`} />
              <span>{itemAtual}</span>
            </a>
          </li>
        )
      }) */ }
    </ul>
  </ProfileRelationsBoxWrapper>
  )
}



export default function Home() {
  const usuarioAleatorio = "Gui-guimaraes";
  const [comunidades, setComunidades] = React.useState(communities);
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  const [seguidores, setSeguidores] = React.useState([]);
  const [seguindo, setSeguindo] = React.useState([]);
  React.useEffect(function () {
    fetch(`https://api.github.com/users/Gui-guimaraes/followers`)
      .then(function(respostaDoServidor) {
        return respostaDoServidor.json();
      }) 
      .then(function(respostaCompleta) {
        setSeguidores(respostaCompleta);
      })
    fetch (`https://api.github.com/users/Gui-guimaraes/following`)
      .then(function(respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function(respostaCompleta) {
        setSeguindo(respostaCompleta);
      })
  }, [])


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


              }}>
                <div>
                  <img src={`https://github.com/${usuarioAleatorio}.png`} style={{borderRadius: '50%', width: '50px', marginRight: 'auto', marginBottom: '8px'}} />
                   <h1 style={{fontSize: '30px', textAlign: 'center',}} className="title">Bem vindo(a), {usuarioAleatorio}</h1>
                </div>
                <div>
                <input 
                placeholder="Começar Publicação"
                name="Começar Publicação"
                />
                 <button  style={{width: '100%', display: 'block', marginTop: '-8px', padding: '12px', background: '#F4F4F4', border: 0, color: '#333333'}}>
                    Enviar
                  </button>
                  <hr />
                  <OrkutNostalgicIconSet />
                </div>
              </form>
            </Box>
            
            <Box>
              <form onSubmit={function handleCreateCommunity(e) {
                e.preventDefault(e)

                const dadosDoForm = new FormData(e.target);

                const comunidade = {
                  id: new Date().toISOString,
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image'),
                  link: dadosDoForm.get('link')
                }

                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              }}>
                <input 
                  placeholder="Criar Comunidade"
                  name="Criar Comunidade"
                  aria-label="Criar Comunidade"
                  autoComplete="off"
                />
                <input 
                placeholder="Coloque um url para capa da comunidade"
                name="imagee"
                aria-label="Coloque um url para capa da comunidade"
                autoComplete="off"
                />
                <button style={{width: '100%', display: 'block', marginTop: '-8px', padding: '12px', background: '#F4F4F4', border: 0, color: '#333333'}}>
                  Enviar
                </button>
              </form>
            </Box>
          </div>
          <div className="profileRelations" style={{gridArea: 'profileRelationsArea'}}>
            <ProfileRelationsBox title="Seguidores" items={seguidores} />
            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Pessoas da comunidade ({pessoasFavoritas.length})
              </h2>

              <ul>
                {pessoasFavoritas.map((itemAtual, i) => {

                  if (i < 6) return (
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
                {comunidades.map((itemAtual, i) => {

                  if(i < 6) return (
                    <li key={itemAtual.id}>
                      <a href={itemAtual.link} target="_blank" >
                        <img src={itemAtual.image || `https://picsum.photos/300/300`} />
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


