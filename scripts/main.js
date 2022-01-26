const ui = require("ui-lib/library");
var dialog = null, button = null;
const max = 100;
var value = 1;
var field=null; var CHANGEME =null;
var afield=null;
var anewfield=null;
var CHANGEMEB=null;

function changeToTeam() {
    Call.sendChatMessage("/js findp('"+Vars.player.name+"').team(Team.get("+value+"))");
}


function setUpMod(){
	Call.sendChatMessage("/js findp=(name)=>Groups.player.find(e=>Strings.stripColors(e.name)==name);")
}

function antiCoreGreif() {
	 Call.sendChatMessage("/js Vars.state.rules.fire=false");
	 Call.sendChatMessage("/js Vars.state.rules.reactorExplosions=false");
	 Call.sendChatMessage("/js Vars.state.rules.damageExplosions=false");
	 Call.sendChatMessage("/js Vars.state.rules.canGameOver=false");
	 Call.sendChatMessage("/js Vars.state.rules.defaultTeam.cores().each(c=>{c.health=1E100})");
}

function changeToSharded() {
    Call.sendChatMessage("/js findp('"+Vars.player.name+"').team(Team.sharded)")
}


function protect() {
    Call.sendChatMessage("/js findp('"+Vars.player.name+"').unit().health=100E9999")
}


function endMap() {
    Call.sendChatMessage("/js Events.fire(GameOverEvent(Team.derelict))")
}

function endLife() {
    Call.sendChatMessage("/js Groups.unit.each(u=>u.kill())")
}


ui.onLoad(() => {
    dialog = new BaseDialog("2r2t Command Assist");
    const table = dialog.cont;
    table.button("Mod Setup", Icon.modeSurvival, setUpMod).width(250)
	 table.row()
	//should be a slider
    const selection = table.table().center().bottom().get();
    var slider; var field;
    // i have no clue on what this does.. try deleting it later to see if it works
	
    slider = selection.slider(0, max, 1, value, n => {
        value = n;
        field.text = n;
    }).get();

    selection.add(" Team ID : ");

    field = selection.field(" " + value, text => {
        value = text;
        slider.value = value;
    }).get();
    field.validator = text => !isNaN(parseInt(text));
	
	//RANDOM STUFF RANDOM STUFF TELL ME HAD YOU HAVE ENOUGH????
    table.row()

    table.button("Change To Custom Team", Icon.modeSurvival, changeToTeam).width(250)
	 table.button("Change To Sharded",Icon.modeSurvival,changeToSharded).width(250)
    table.row();
    table.button("Anti Greif", Icon.modeSurvival, antiCoreGreif).width(250)
	 table.row();
	 table.button("Unit Upgrade", Icon.modeSurvival, protect).width(250)
	 table.row();
	 table.button("End Life On Earth", Icon.modeSurvival, endLife).width(250)
	 table.row();

    dialog.addCloseButton();
});

ui.addButton("thing", Blocks.router, () => {
    dialog.show();
}, b => { button = b.get() });
