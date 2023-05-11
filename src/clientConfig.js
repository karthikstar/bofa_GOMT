import { createClient } from "@supabase/supabase-js"
import { Database } from 'lib/database.types'

const supabase = createClient('https://djqvepfyrsuttgfydjkf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqcXZlcGZ5cnN1dHRnZnlkamtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM3Njg4MDgsImV4cCI6MTk5OTM0NDgwOH0.3qhWNz0u2c_1pzL6dfm3NsxKk7VEGT9RJJJ1o1zlrzs')

async function getConfig(username){
    clientID = supabase.from('Users').select('id').eq('username', username)

    return await supabase.from('current_info')
        .select('commission_difference', 'grossamount_difference')
        .eq('id', clientID)
        .eq('active_status', true)
}

async function getPending(){
    return await supabase.from('current_info')
        .select('id, user_id, commission_difference, grossamount_difference')
        .eq('approval_status', false)
}

async function getVersions(username){
    clientID = supabase.from('Users').select('id').eq('username', username)

    archiveIDs = supabase.from('current_info')
        .select('id')
        .eq('user_id', clientID)

    return await supabase.from('archive_info')
        .select('time, snapshot, edit_comments')
        .eq('id', archiveIDs)
}

async function approve(client, configID, approver){
    approverID = supabase.from('Users').select('id').eq('username', username)
    clientID = supabase.from('Users').select('id').eq('username', client)

    supabase.from('current_info')
        .update({active_status: false})
        .eq('id', clientID)
        .eq('active_status', true)

    supabase.from('current_info')
        .update({approval_status: true, approver_id: approverID, active_status: true})
        .eq('id', configID)
    
    currentSnapshot = snapshot(configID)

    supabase.from('archive_info')
        .insert({snapshot: currentSnapshot})
    
}

async function rollback(){
    
}

async function snapshot(configID){
    currentSnapshot = supabase.from('current_info')
        .select('*')
        .eq('id', configID)

    return currentSnapshot //check if json format
}