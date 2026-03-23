import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { action, payload } = await req.json()
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set')
    }

    let result;

    switch (action) {
      case 'generate-exercise':
        result = await generateExercise(payload, GEMINI_API_KEY)
        break
      case 'evaluate-feedback':
        result = await evaluateFeedback(payload, GEMINI_API_KEY)
        break
      case 'analyze-reflection':
        result = await analyzeReflection(payload, GEMINI_API_KEY)
        break
      default:
        throw new Error(`Unknown action: ${action}`)
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

/**
 * Action Handlers
 */

async function generateExercise(payload: any, apiKey: string) {
  const { domain, subskill, level } = payload
  const prompt = `
    You are an expert Career Coach for Staff Engineers. 
    Generate a 10-minute micro-exercise for the domain '${domain}' and sub-skill '${subskill}'.
    The user's current level is '${level}'.
    The exercise must be practical, tactical, and high-impact.
    
    Return a JSON object with:
    {
      "title": "Short catchy title",
      "instructions": "Step-by-step instructions",
      "reflectionPrompt": "A deep question to ask after completion",
      "evaluationCriteria": ["Criterion 1", "Criterion 2"]
    }
  `
  return await callGemini(prompt, apiKey)
}

async function evaluateFeedback(payload: any, apiKey: string) {
  const { userResponse, evaluationCriteria, subskill } = payload
  const prompt = `
    Evaluate the following user response for the micro-exercise sub-skill: '${subskill}'.
    Criteria: ${JSON.stringify(evaluationCriteria)}
    User Response: "${userResponse}"
    
    Analyze the quality and provide:
    - A summary of their performance
    - Specific strengths
    - Areas for improvement
    - A surgical coaching tip for next time
    - A mastery signal score between 0.0 and 1.0
    
    Return a JSON object with:
    {
      "summary": "...",
      "strengths": ["..."],
      "improvements": ["..."],
      "coachingTip": "...",
      "masterySignal": 0.85
    }
  `
  return await callGemini(prompt, apiKey)
}

async function analyzeReflection(payload: any, apiKey: string) {
  const { reflectionText, scores } = payload
  const prompt = `
    Analyze this career reflection text alongside these numerical assessments: ${JSON.stringify(scores)}.
    Reflection: "${reflectionText}"
    
    Identify behavioral patterns, detect if there is a gap between their scores and reflection (overestimation/underconfidence), and extract key growth themes.
    
    Return a JSON object with:
    {
      "themes": ["..."],
      "strengths": ["..."],
      "risks": ["..."],
      "analysisSummary": "...",
      "confidenceGap": true/false,
      "gapType": "overestimation/underconfidence/aligned"
    }
  `
  return await callGemini(prompt, apiKey)
}

async function callGemini(prompt: string, apiKey: string) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { response_mime_type: "application/json" }
    })
  })
  
  const data = await response.json()
  const text = data.candidates[0].content.parts[0].text
  return JSON.parse(text)
}
