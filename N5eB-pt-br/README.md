# Naruto 5e - Português (Brasil)

Tradução para Português (Brasil) do sistema **Naruto 5e (n5eb)** no Foundry VTT: interface (`pt-br.json`) e compêndios (pasta `compendium/`, aplicados em tempo real pelo Babele).

Tradução original por **PreTusko**.

## Requisitos

- Foundry VTT **v13 ou v14** (verificado no 14.368)
- Sistema **n5eb**
- Módulo **Babele 2.9+** (que por sua vez requer o **libWrapper**)

## Instalação

No Foundry, em *Módulos Complementares → Instalar Módulo*, cole no campo **URL do Manifesto**:

```
https://github.com/LuizHenriquelhlt/Foundry-Modulos-Naruto/releases/latest/download/module.json
```

Com o manifesto, o Foundry avisa e instala as novas versões sozinho. Também dá para instalar manualmente extraindo o `N5eB-pt-br.zip` de um release em `Data/modules/N5eB-pt-br/`.

## Uso

1. Ative este módulo e o Babele no mundo.
2. Em *Configurações → Idioma*, escolha **Português (Brasil)**.
3. Recarregue o mundo; os compêndios do n5eb aparecem traduzidos.

## Para mantenedores

- **Publicar uma versão:** envie uma tag `vX.Y.Z` (`git tag v0.4.0 && git push origin v0.4.0`) ou crie um release no GitHub com essa tag. O workflow `.github/workflows/release.yml` ajusta a versão e os links do `module.json`, valida os JSON, cria o release (se ainda não existir) e anexa `module.json` e `N5eB-pt-br.zip`.
- **Atualizar traduções após uma versão nova do n5eb:** no Foundry, clique com o botão direito num compêndio → *Exportar traduções* (Babele). O arquivo gerado já inclui atividades e progressões no mesmo formato dos arquivos em `compendium/`.
- Evite colar texto direto de páginas web nos campos: estilos como `color` e `font-family` fixos ficam ilegíveis no tema escuro do Foundry.

## Changelog

### 0.3.0
- Removidos estilos inline colados do navegador (cor de texto quase preta, fundo bege, fontes fixas) em ~400 descrições: o texto agora fica legível nos temas claro e escuro do Foundry v13/v14. O conteúdo dos textos não mudou.
- Exportação de traduções do Babele passa a incluir atividades e progressões.
- Instalação e atualização automática via manifesto, publicada por GitHub Releases neste repositório.

### 0.2.1
- Conversores de atividades e progressões não alteram mais os dados originais do compêndio (o Babele consegue exibir/restaurar o texto original).
- `module.json`: descrição adicionada, compatibilidade verificada no Foundry 14.368, campos `flags` vazios removidos.
- Removidos os compêndios legados em `packs/` (formato NeDB do Foundry 0.8, herdados de outro módulo e nunca registrados no `module.json`).
