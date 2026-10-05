# 00 · Brief

The exercise as received on 2026-10-02, kept as is. Only the demo user, the demo password and private links are replaced with `[REDACTED: …]`. Section 3 is the Help Center article provided with the brief (the Help Center requires a login).

## 1. Brief (original, Spanish)

**Ejercicio · Stock compensation en Sherpas**
### Contexto
Sherpas construye agentes de IA que automatizan el trabajo invisible del asesoramiento financiero. Nuestros usuarios son asesores patrimoniales de grandes firmas en Estados Unidos; a través de ellos, el producto llega a sus clientes.
El asesor recoge la información del cliente con un cuestionario, y la plataforma genera un análisis de Financial Health: un diagnóstico de la situación financiera del hogar, con un score y un informe que el asesor usa en la conversación con su cliente.
Hoy, cuando un cliente tiene stock compensation (acciones o derechos sobre acciones de su empresa como parte de su retribución), no hay un sitio donde meterla. Queremos cambiarlo.
### El encargo
Propón nos cómo integrarías stock compensation en la plataforma.
Esto es lo que esperamos ver cubierto, en el orden y con la profundidad que tú decidas:
Cómo se introduce: qué le preguntamos al cliente (o al asesor) y cómo.
Qué tipos de stock compensation contemplarías.
Cómo se modeliza dentro del análisis.
Qué análisis podríamos ofrecer al asesor a partir de ello.
Tú decides qué entra, qué no, y en qué orden. Lo que dejes fuera y por qué nos interesa tanto como lo que metas.
### Lo que tienes
Acceso a la plataforma (cuenta demo). Es una cuenta con datos ficticios; puedes tocar lo que quieras.
Cuestionario, tal como lo rellena el cliente: te mando tu enlace personal por email. Es de un solo uso: una vez enviado no se puede volver a abrir, así que explóralo con calma antes de enviarlo.
Diagnóstico, tal como lo ve el cliente final
Usuario: [REDACTED: demo user]
Contraseña: [REDACTED: demo password]
Cómo modelamos la vida financiera de una persona. Cualquier elemento financiero de la vida de un cliente puede expresarse en hasta cuatro dimensiones: activo, pasivo, ingreso y gasto. No todas aparecen siempre, y un mismo elemento puede tener varias de cada tipo.
Una casa, por ejemplo: es un activo (la vivienda), puede llevar uno o más pasivos (la hipoteca), puede generar un ingreso (la renta si se alquila) y genera gastos (impuestos, comunidad, mantenimiento).
El cuestionario recoge los elementos de la vida del cliente y el diagnóstico los lee a través de esas cuatro dimensiones: qué tiene, qué debe, qué entra y qué sale. De ahí salen el score de Financial Health y el informe que explica al asesor por qué el score ha salido así y qué se puede hacer para mejorarlo.
Cómo se calcula el score. Aquí tienes el artículo completo de nuestro Help Center
How is the Financial Health Score calculated?
Un tablero de Miro en blanco, si te sirve para pensar o documentar: te mando el tuyo por email.
Una página de Notion tuya para trabajar, crear lo que consideres y enlazar lo que hagas fuera: también te llega por email. Organízala como quieras.
Y yo. Si tienes dudas durante la semana, escríbeme.
### Formato y entrega
Formato libre. Notion, Miro, Excel, prototipo, código, lo que te sirva. Cuantas más herramientas uses para pensar y para enseñarnos cómo piensas, mejor.
Junto con la entrega, un vídeo de 3–5 minutos en inglés en el que nos presentes lo que has preparado: qué propones, por qué, qué has dejado fuera, y el proceso que has seguido para llegar ahí.
Fecha de entrega: la que acordemos por email.
Después, una sesión de 30 minutos para comentarlo juntos.
Todo lo que veas en la plataforma es confidencial; te pedimos que no lo compartas fuera de este ejercicio.

## 2. Email (original, Spanish)

Hola Renier,

Gracias por tu tiempo esta mañana. Como te comenté, aquí tienes el ejercicio práctico:
Enunciado
Tu espacio de trabajo en Notion
Tu enlace al cuestionario
Tu tablero de Miro [REDACTED: private link]
El enlace al cuestionario es de un solo uso: una vez enviado no se puede volver a abrir, así que explóralo con calma antes de enviarlo.

Formato libre y usa la IA todo lo que quieras. Junto con la entrega, un vídeo corto en inglés (3 a 5 minutos) presentando lo que has hecho y el proceso que has seguido.

Como hablamos, quedamos en que me lo entregas el miércoles 7 de octubre. Si te surge cualquier duda, escríbeme.

Un saludo,

Jesús David
Head of Product @ Sherpas
## 3. Score article (Help Center copy, provided with the brief)

The Help Center needs a login: without one, both articles show "Unable to load this article, you may need to sign in first" (checked 2026-10-03). URL: https://help.sherpaswealth.com/en/articles/14180221-how-is-the-financial-health-score-calculated · Linked: https://help.sherpaswealth.com/en/articles/16889200-why-does-the-score-not-match-the-sum-of-the-areas

How is the Financial Health Score calculated?
Copia del artículo del Help Center de Sherpas: How is the Financial Health Score calculated?
The Financial Health Score is a single number from 0 to 100 that Sherpas calculates automatically when you generate a Financial Health analysis. Individual checks on the client's data are scored, grouped into five areas, Cash flow, Debt, Protection, Liquidity and Investing, and combined into one weighted number that a few serious issues can then hold down.
The View more panel next to the score shows the whole path, and you can adjust the number on screen within ±10 points of the calculated value.
> **Note**
> This version of the score is in beta and is not switched on for every account yet. If there is no View more link next to the Financial Health Score in your analysis, your account is still on the earlier version, which combined five equally weighted pillars, and this article does not describe what you see. Contact Sherpas to request access to the beta.


Where to see the score
Open an opportunity in Analysis in progress or later and open its analysis. The score sits at the top of the Financial health tab, and on the cover of the Summary PDF with five coloured dots for the five areas. Click View more beside it for the breakdown.
The colour follows the range: Excellent 85 to 100 and Strong 70 to 84 are green, Stable 55 to 69 is amber, Vulnerable 40 to 54 and Critical 0 to 39 are red.

How the score is built
Four steps, each visible in the View more panel:
1. Individual checks are scored. Each reads one figure, for example the savings rate, the housing load, or the cover in place against the cover needed, and turns it into a 0 to 100 score. There is no pass or fail: each check sits on a scale, so being close to a target and being nowhere near it score differently.
2. Checks are grouped into five areas. Each area score is the weighted average of the checks that apply to that household.
3. The five areas are combined, each contributing a share that depends on the household's life stage. That is what the panel shows on each row: points contributed, out of points available.
4. Limits are applied. A few serious issues hold the score down rather than being averaged away, so it can end up lower than the areas add up to. When that happens a line under the breakdown says so. See Why does the score not match the sum of the areas?
The result is rounded to a whole number, which is the score you see.

What each area looks at
Cash flow: whether the money moving between income and assets fits what the plan asks of it. Mainly the savings rate while building wealth, the sustainability of the draw in retirement, and fixed commitments in both.
Debt: whether each liability is sensibly priced, sized and matched to what it paid for. Rates against what that kind of borrowing normally costs, whether revolving balances are coming down, and housing costs against income.
Protection: whether the catastrophic downsides are covered. Life cover against the need, liability cover against the assets exposed, and whether the everyday policies are in place and adequate.
Liquidity: whether the household can absorb a shock without a forced sale. How long the reserves last, and whether money is set aside for near-term commitments already known.
Investing: whether capital is positioned for its purpose and horizon. Allocation against the risk profile, concentration in the largest position, cash sitting idle beyond the reserve, whether assets sit in the account type that suits them, and in retirement how much of essential spending is covered by income that does not depend on markets.
The exact figures and thresholds behind each check are not shown in the product.

Why the points available to each area change
The same behaviour does not carry the same weight at every point in life, so Sherpas reads whether the household is still building wealth or already drawing on its portfolio, from its actual contributions and withdrawals, and weights the areas accordingly.
Still building wealth: 30 cash flow, 20 debt, 20 protection, 15 liquidity, 15 investing. In retirement: 25 cash flow, 10 debt, 20 protection, 20 liquidity, 25 investing. A household in transition sits between the two, so the denominators can be values in between.

Adjusting the score
1. Click the score at the top of the Financial health tab to make it editable.
2. Type a value within ±10 points of the calculated score, or use the plus and minus buttons.
3. Click away. Sherpas asks why you are adjusting it; add a short explanation or skip it, and either way the new score is saved.
Your number is what appears in the header and on the PDF. The panel notes that the score was adjusted and keeps explaining the calculated score, so the breakdown still reconciles.

FAQs
My client is debt-free. Why do they still have a Debt score?
Checks that cannot apply to a household are removed from that area and the remaining checks take up the freed weight, so a debt-free household scores well rather than scoring zero.
The same logic runs everywhere: life cover is not assessed when nobody depends on the earner's income, and the retirement-specific checks do not apply to a household still building wealth.
What happens when data is missing?
A figure Sherpas does not have is left out of the calculation. It is not treated as a zero and not treated as average, because either would invent a result the data does not support.
So an incomplete picture produces a score based on less evidence. If a score looks off, check Data & Assumptions for gaps before reading much into it.
Does adjusting the score change the analysis or recommendations?
No. It changes only the number on screen. Observations, recommendations and the rest of the analysis stay based on the client's actual data, and the breakdown continues to explain the calculated score.
Does editing data in Data & Assumptions affect the score?
Yes. Saving a change there reprocesses the analysis and recalculates the score from the new data.
Any adjustment you made by hand is replaced in that process, so finalize your data edits before adjusting the score.
Will the same client always get the same score?
Yes, from the same data. The calculation always works the same way, so re-running the analysis on unchanged data returns the same number.
It moves when the data moves, when you adjust it by hand, or when Sherpas updates the calculation itself, which is being tuned while the new score is in beta.

## 4. Follow-up email, 2026-10-05 (original, Spanish; excerpt)

Only the sentences about the case; the link is not reproduced.

Aquí tienes un enlace nuevo al cuestionario, recién creado y sin usar: [REDACTED: private link]

Como el anterior, es de un solo uso, así que explóralo con calma antes de enviarlo.

Sobre el acceso de asesor: el ejercicio está pensado para que trabajes solo desde la parte del cliente, así que sigue tal cual.
