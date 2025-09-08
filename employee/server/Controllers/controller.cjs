const bcrypt = require('bcrypt')
const { OAuth2Client } = require('google-auth-library');
const nodemailer = require('nodemailer')
const client = new OAuth2Client('1014320992008-e5dge5u0olirdnjaupe05tos011i994i.apps.googleusercontent.com');

let otp;
const otpStore = new Map()

const generateOTP = (email) => {
    otp = Math.floor(Math.random() * (10000-1000) + 1000)
    otpStore.set(email,otp);
}

const trackOTP = (email) => {
    console.log(otpStore)
    setTimeout(()=>{
        otpStore.delete(email)
    },180000)
}

exports.getEmployee = async(req,res) => {
    try{
        const [result] = await req.db.query('select * from crm');
        if(result.length===0){
            console.log(result)
            return res.json({status:'notsure',message:'No Records Found!'})
        }
        const employees = result.map(emp => ({
            ...emp,
            dp: emp.dp ? Buffer.from(emp.dp).toString('base64') : null
        }))
        console.log(employees)
        return res.json({status:'success',list:employees})
    }
    catch(err){
        console.log(err)
        return res.json({status:'failure',message:'Something went wrong!'})
    }
}

exports.addEmployee = async(req,res) => {
    try{
        const {name,id,department,designation,project,type,status} = req.body;
        const file = req.file ? req.file.buffer : null;
        const [result] = await req.db.query('select id from crm where id=(?)',[id])
        if(result.length>0)
            return res.json({status:'failure',message:'Already a User Found with this ID!'})
        await req.db.query('insert into crm (name,id,department,designation,project,type,status,dp) values (?,?,?,?,?,?,?,?)',[name,id,department,designation,project,type,status,file])
        console.log('Inserted!')
        return res.json({status:'success',message:'Employee Added Successfully!'})
    }
    catch(err){
        console.log(err)
        return res.json({status:'failure',message:'Something went wrong!'})
    }
}

exports.deleteEmployee = async (req,res) => {
    try{
        const {emp_id} = req.body;
        const [exists] = await req.db.query('select id from crm where id = (?)',[emp_id])
        if(exists.length === 0)
            return res.json({status:'failure',message:'Employee Not Found!'})
        await req.db.query('delete from crm where id = (?)',[emp_id])
        return res.json({status:'success',message:'Employee Deleted Successfully!'})
    }
    catch(err){
        console.log(err)
        return res.json({status:'failure',message:'Something went wrong!'})
    }
}

exports.editEmployee = async (req,res) => {
    try{
        const {name,id,department,designation,project,type,status} = req.body
        const file = req.file && req.file.buffer || null
        const [result] = await req.db.query('select id from crm where id = (?)',[id])
        if(result.length===0)
            return res.json({status:'failure',message:'Employee Not Found!'})
        if(file)
            await req.db.query('update crm set name=(?), department=(?), designation=(?), project=(?), type=(?), status=(?), dp = (?) where id=(?)',[name,department,designation,project,type,status,file,id])
        else
            await req.db.query('update crm set name=(?), department=(?), designation=(?), project=(?), type=(?), status=(?) where id=(?)',[name,department,designation,project,type,status,id])
        return res.json({status:'success',message:'Employee Updated Successfully!'})
    }
    catch(err){
        console.log(err)
        return res.json({status:'failure',message:'Something went wrong!'})
    }
}

exports.login = async (req,res) => {
    try{
        const {username,password} = req.body
        const [result] = await req.db.query('select username,password from users where username = (?)',[username])
        if(result.length===0)
            return res.json({status:'failure',message:'No User Found! Please Signup First!'})
        console.log(result[0])
        const valid = bcrypt.compareSync(password,result[0].password)
        if(valid)
            return res.json({status:'success',message:'Login Successful!'})
        return res.json({status:'failure',message:'Incorrect Username or Password!'})
    }
    catch(err){
        console.log(err)
        return res.json({status:'failure',message:'Something went wrong!'})
    }
}

exports.signup = async (req,res) => {
    try{
        const [result] = await req.db.query('select username from users where username = (?)',[req.body.username])
        if(result.length!==0)
            return res.json({status:'failure',message:'User Already Found! Please Login Instead!'})
        const encrypted = await bcrypt.hash(req.body.password,10)
        await req.db.query('insert into users (username,password) values (?,?)',[req.body.username,encrypted])
        return res.json({status:'success',message:'User Registered Successfully!'})
    }
    catch(err){
        console.log(err)
        return res.json({status:'failure',message:'Something went wrong!'})
    }
}

exports.getAdmin = async (req,res) => {
    try{
        return res.json({status:'success',links:`https://th.bing.com/th/id/OIP.OdQQJxf0UFikV_SreFYyoQHaHa?w=187&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3`})
    }
    catch(err){
        console.log(err)
        return res.json({status:'failure',message:'Something went wrong!'})
    }
}

exports.google_login = async (req, res) => {
  const {token} = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: '1014320992008-e5dge5u0olirdnjaupe05tos011i994i.apps.googleusercontent.com',
  });
  console.log(ticket)
  const payload = ticket.getPayload();
  console.log(payload)
  return res.json({status:'success',message:'Google Login Successful',user:payload});
}

exports.logUser = async (req,res) => {
    const {details,username} = req.body;
    try{
        console.log('OAUTH: ');
        console.log(details.user.email)
        console.log(details.user.given_name)
        await req.db.query('insert into logs (gmail,name) values (?,?)',[username,details.user.given_name])
        return res.json({status:'success'})
    }
    catch(err){
        console.log(err);
        return res.json({status:'failure',message:'Something went wrong!'})
    }
}

exports.getLogs = async (req,res) => {
    try{
        const [result] = await req.db.query(`select * from logs`)
        if(result.length===0)
            return res.json({status:'not_sure',message:'No Logs Found'})
        return res.json({status:'success',list:result})
    }
    catch(err){
        console.log(err)
        return res.json({status:'failure',message:'Something went wrong!'})
    }
}

exports.forgot = async (req,res) => {
    const {email} = req.body
    const [result] = await req.db.query('select username from users where username = (?)',[email])
    if(result.length===0){
        return res.json({status:'failure',message:'Email Not Exists! Signup First!'})
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.mailuser,
            pass: process.env.mailpass,
        },
    })
    generateOTP(email)
    const mailOptions = {
        from: process.env.mailuser,
        to: email,
        subject: "3 Minutes OTP from Employee CRM...",
        text: `Your OTP for Reset Password is ${otp} only valid for 3 Minutes! Hurry up!...`
    }
    transporter.sendMail(mailOptions,(err)=>{
        if(err){
            console.log(err)
        }
    })
    trackOTP(email)
    res.send({status:'success'})
}

exports.verifyOTP = async (req,res) => {
    try{
        const {email,otp,newPassword} = req.body;
        if(otpStore.has(email)){
            if(otpStore.get(email)===Number(otp)){
                console.log(otpStore.get(email))
                console.log(Number(otp))
                console.log(otpStore.get(email)===Number(otp))
                let newOne = await bcrypt.hash(newPassword,10)
                await req.db.query('update users set password = (?) where username = (?)',[newOne,email])
                return res.json({status:'success'})
            }
            return res.json({status:'failure',message:'Invalid OTP'})
        }
        else{
            return res.json({status:'failure',message:'Please Ask to Generate an OTP First!'})
        }
    }
    catch(err){
        console.log(err)
        return res.json({status:'failure',message:'Something went wrong!'})
    }

}

