import app from './app';

const PORT = process.env.PORT || 4004;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
