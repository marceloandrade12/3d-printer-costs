# Calculadora de Custos 3D

Web app 100% browser para calcular custos de produção de peças impressas em 3D.

## Stack

- React + TypeScript
- Vite
- Material UI
- Zustand + localStorage

## Executar

```bash
npm install
npm run dev
```

Para build de produção:

```bash
npm run build
```

## Modelo de cálculo

- Máquina = horas × custo/hora
- Filamento = (gramas/1000) × preço/kg × quantidade
- Extras = custo extra/peça × quantidade
- Total = máquina + filamento + extras
- Venda = total × (1 + acréscimo/100)

O tempo da máquina é o tempo total da impressão e não é multiplicado pela quantidade quando várias peças são impressas em simultâneo.
