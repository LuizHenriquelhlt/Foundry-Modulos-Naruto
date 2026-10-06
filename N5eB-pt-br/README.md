# Naruto 5e - Português (Brasil)

Tradução para Português (Brasil) do sistema **Naruto 5e (n5eb)** no Foundry VTT: interface (`pt-br.json`) e compêndios (pasta `compendium/`, aplicados em tempo real pelo Babele).

## Requisitos

- Foundry VTT **v13 ou v14** (verificado no 14.368)
- Sistema **n5eb**
- Módulo **Babele 2.9+** (que por sua vez requer o **libWrapper**)

## Uso

1. Ative este módulo e o Babele no mundo.
2. Em *Configurações → Idioma*, escolha **Português (Brasil)**.
3. Recarregue o mundo; os compêndios do n5eb aparecem traduzidos.

## Changelog

### 0.2.1
- Conversores de atividades e progressões não alteram mais os dados originais do compêndio (o Babele consegue exibir/restaurar o texto original).
- `module.json`: descrição adicionada, compatibilidade verificada no Foundry 14.368, campos `flags` vazios removidos.
- Removidos os compêndios legados em `packs/` (formato NeDB do Foundry 0.8, herdados de outro módulo e nunca registrados no `module.json`).
