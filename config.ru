require 'rack'

use Rack::Static,
  :urls => ["images"],
  :root => "."

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html'
    },
    File.open('index.html', File::RDONLY)
  ]
}
