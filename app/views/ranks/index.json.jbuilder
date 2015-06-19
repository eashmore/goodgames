json.array! @ranks do |rank|
  json.partial! 'ranks/rank', rank: rank
end
