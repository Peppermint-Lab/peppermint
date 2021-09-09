exports.downloadFile = async (req, res) => {
    const filepath = req.body.filepath;
    try {
      res.download(filepath, (err) => {
        if (err) console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  };
  