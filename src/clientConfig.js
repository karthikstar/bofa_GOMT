import { createClient } from "@supabase/supabase-js"
import { Database } from 'lib/database.types'

const supabase = createClient('https://djqvepfyrsuttgfydjkf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqcXZlcGZ5cnN1dHRnZnlkamtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM3Njg4MDgsImV4cCI6MTk5OTM0NDgwOH0.3qhWNz0u2c_1pzL6dfm3NsxKk7VEGT9RJJJ1o1zlrzs')

function login(username, password){
    target = supabase.from('Users')
        .select('password')
        .eq('username', username)
    
    return password == target
}

async function getConfig(clientID){
    return await supabase.from('current_info')
        .select('commission_difference', 'grossamount_difference')
        .eq('client_id', clientID)
        .eq('active_status', true)
}

async function getPending(userID){
    return await supabase.from('current_info')
        .select('id, client_id, commission_difference, grossamount_difference')
        .eq('approval_status', 'PENDING')
        .neq('user_id', userID)
}

async function getVersions(clientID){
    return await supabase.from('archive_info')
        .select('id, client_id, time, snapshot, edit_comments')
        .eq('client_id', clientID)
}

async function submit(clientID, grossAmountDifference, commissionDifference, userID){
    supabase.from('current_info')
    .insert({grossamount_difference: grossAmountDifference, commission_difference: commissionDifference, approval_status: "PENDING", 
        active_status: false, time: Date.now(), client_id: clientID, user_id: userID})
}

async function approve(clientID, configID, approverID, editComments){
    supabase.from('current_info')
        .update({active_status: false})
        .eq('id', clientID)
        .eq('active_status', true)

    supabase.from('current_info')
        .update({approval_status: "APPROVED", approver_id: approverID, active_status: true})
        .eq('id', configID)
    
    currentSnapshot = snapshot(configID)

    supabase.from('archive_info')
        .insert({snapshot: currentSnapshot, edit_comments: editComments, client_id: clientID})
    
}

async function rollback(archiveID){
    currentSnapshot = supabase.from('archive_info')
        .select('snapshot')
        .eq('id', archiveID)

    
    supabase.from('current_info')
        .update({active_status: false})
        .eq('id', clientID) //clientID get from snapshot
        .eq('active_status', true)

    supabase.from('current_info')
        .insert({approver_id: currentSnapshot.approver_id, grossamount_difference: currentSnapshot.grossamount_difference, 
            commission_difference: currentSnapshot.commission_difference, approval_status: currentSnapshot.approval_status, 
            active_status: true, time: currentSnapshot.time, client_id: currentSnapshot.client_id, user_id: currentSnapshot.user_id}) //insert columns 
}

async function snapshot(configID){
    currentSnapshot = supabase.from('current_info')
        .select('*')
        .eq('id', configID)

    return currentSnapshot //check if json format
}

