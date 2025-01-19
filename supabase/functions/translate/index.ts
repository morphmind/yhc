import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { apiKey, model, text, targetLanguage } = await req.json()

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!text || !targetLanguage) {
      return new Response(
        JSON.stringify({ error: 'Text and target language are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Call OpenAI API
    try {
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model || 'gpt-4o-mini',
          messages: [{
            role: 'system',
            content: `You are a professional translator. Translate the following text to ${targetLanguage}. Maintain any HTML tags, variables, or special formatting. Only return the translated text, nothing else.`
          }, {
            role: 'user',
            content: text
          }],
          temperature: 0.3
        })
      })

      if (!openaiResponse.ok) {
        const error = await openaiResponse.json()
        return new Response(
          JSON.stringify({ error: error.error?.message || 'OpenAI API error' }),
          { status: openaiResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const data = await openaiResponse.json()
      const translation = data.choices[0].message.content

      return new Response(
        JSON.stringify({ translation }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      )
    } catch (error) {
      console.error('OpenAI API error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to communicate with OpenAI API' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    console.error('General error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})