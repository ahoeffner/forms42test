module.exports =
{
  devtool: "eval-source-map",
  entry: './src/index.ts',
  output:
  {
    path: __dirname+'/dist',
    filename: 'test.js',
    library: "forms42core"
  },
  module:
  {
    rules:
    [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use:
        {
          loader: 'ts-loader'
        }
      }
      ,
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  }
  ,
  resolve:
  {
    extensions: ['.ts','.js']
  }
}