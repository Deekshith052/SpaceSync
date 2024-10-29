import app from './app';

const PORT = process.env.PORT || 4008;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

