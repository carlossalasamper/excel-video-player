export default function setCalculationMode(mode: Excel.CalculationMode) {
  return Excel.run(async (context) => {
    context.application.calculationMode = mode;
    await context.sync();
  }).catch((error) => {
    console.error("Error setting calculation mode:", error);
  });
}
