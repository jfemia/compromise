import test from 'tape'
import nlp from './_lib.js'

test('date-phrase tests:', function (t) {
  let arr = [
    [`remind me to buy eggs`, `buy`, `egg`, ``],
    [`please remind me to buy eggs`, `buy`, `egg`, ``],
    [`i really should buy some eggs`, `buy`, `egg`, ``],
    [`i need to remember to buy the eggs`, `buy`, `egg`, ``],
    [`i really ought to buy us some eggs`, `buy`, `egg`, ``],
    [`remember to buy eggs tomorrow`, `buy`, `egg`, `tomorrow`],
    [`i should buy eggs for the kids on sunday`, `buy`, `egg`, `on sunday`],
    [`when i'm at work, buy some eggs for kathrine`, `buy`, `egg`, ``],
    [`it's important that i return the library books`, `return`, `library book`, ``],
    [`please tell john to walk the dogs each night`, `tell`, `john`, `each night`],
    [`don't forget to remind me about returning the library books`, `return`, `library book`, ``],
    [`i've gotta buy some paint for the ceiling on monday`, `buy`, `paint`, `on monday`],
    [`if i'm free, return the books to the library`, `return`, `book`, ``],
    [`bring back the library books`, `bring back`, `library book`, ``],
    [`all the books need to be brought back by tuesday`, `bring back`, `book`, `by tuesday`],
    [`bring the paint cans to the dump with johnny on tuesday`, `bring`, `paint can`, `on tuesday`],
    [`vote on tuesday`, `vote`, ``, `on tuesday`],
    // [`vote after work`, `vote`, ``, `after work`],
    [`buy some bananas`, `buy`, `banana`, ``],
    [`cancel subscription to netflix`, `cancel`, `subscription`, ``],
    [`fixup all the credit cards I lost`, `fixup`, `credit card`, ``],
    [`hey Joseph, i gotta get my homework finished tonight`, ``, `homework`, `tonight`],
    [`workshop some idea with fred`, `workshop`, `idea`, ``],
    [`bust open the screen door by the gate`, `bust open`, `screen door`, ``],
    [`widen the cabinet to fit my playstation`, `widen`, `cabinet`, ``],
    [`call up the architecture firm`, `call up`, `architecture firm`, ``],
    [`find a dogsitter`, `find`, `dogsitter`, ``],
    [`call amber`, `call`, `amber`, ``],
    [`fire debrah`, `fire`, `debrah`, ``],
    [`tell jude to make it better`, `tell`, `jude`, ``],
    [`remind fred to buy shoes`, `remind`, `fred`, ``],
    [`create a business plan`, `create`, `business plan`, ``],
    [`sell the hotdogs at wrigley on friday`, `sell`, `hotdog`, `on friday`],
    [`i'm worried about forgetting amber's necklace`, ``, ``, ``],
    [`reply to frank about sausage rolls for the wedding meal`, `reply`, `frank`, ``],
    [`book the flight to chicago and figure out those details`, `book`, `flight`, ``],
    [`sell the computer on ebay`, `sell`, `computer`, ``],
    [`remember to sell the computer tomorrow on ebay`, `sell`, `computer`, `tomorrow`],
    [`set your alarm at 6:15`, `set`, `alarm`, `at 6:15`],
    [`coroborate details wit anna about thanksgiving`, `coroborate`, `detail`, `thanksgiving`],
    [`drive to hamilton`, `drive`, `hamilton`, ``],
    [`remind me to drive to waterloo on thursday night`, `drive`, `waterloo`, `on thursday night`],
    [`remind me to get snow tires`, `get`, `snow tire`, ``],
    [`archive my family photos`, `archive`, `family photo`, ``],
    [`before the landlord comes, test the smoke alarm`, `test`, `smoke alarm`, ``],
    [`send the lab samples to houston`, `send`, `lab sample`, ``],
    // [`archive all details before tuesday's meeting`, `archive`, `detail`, ``], //hmm
    [`if jude is late, send her an email`, `send`, `email`, ``],
    [`have a talk with amber about her instagram account`, `have a talk`, `talk`, ``],
    [`reply to all my emails in the morning`, `reply`, `email`, `in the morning`],
    [`ask june to sell off all my assets in tomorrow's meeting`, `ask`, `june`, ``],
    [`don't forget about sending dad a postcard from jupiter`, `send`, `dad`, ``],
    [`all unique ids need to enter the database`, `need to enter`, `database`, ``],
    [`reply to that guy on okcupid`, `reply`, `guy`, ``],
    // [`send a message to dad thanking him for sunday`, `send`, `message`, ``],
    [`add up the costs of vacationing and equip john with the totals`, `add up`, `cost`, ``],
    // [`terminate all relations with monica immediately`, `terminate`, `relation`, `immediately`],
    [`confirm the totals precede the tax return`, `confirm`, `total`, ``],
    [`make-up the bed and clean the sheets`, `make-up`, `bed`, ``],
    [`clean the appartment and do the dishes`, `clean`, `appartment`, ``],
    [`keep the appartment clean`, `keep`, `appartment`, ``],
    [`add the reciepts up and guarantee a clear decision`, `add`, `reciept`, ``],
    [`grab some groceries tomorrow for the sale`, `grab`, `grocery`, `tomorrow`],
    [`keep tabs on danny this week and ensure he's ok with sandra`, `keep tabs on`, `danny`, `this week`],
    [`write more documentation`, `write`, `documentation`, ``],
    [`please tell me to upload the spreadsheet for danny on friday`, `upload`, `spreadsheet`, `on friday`],
    [`work-up the courage to ask stephanie out`, `work-up`, `courage`, ``],
    [`saturday date with sandra`, ``, `date`, `saturday`],
    [`lunch with Dr. Salvonio on tuesday at 10`, ``, `lunch`, `on tuesday at 10`],
    [`sell the raptors tickets for valentines day`, `sell`, `raptors ticket`, `valentines day`],
    [`bridge with daisy and her sisters`, ``, `bridge`, ``],
    [`work-out tomorrow`, `work-out`, ``, `tomorrow`],
    [`book club every wednesday`, ``, `book club`, `every wednesday`],
    [`sell the rights to my autobiography to judy on instagram`, `sell`, `right`, ``],
    [`remind john to sell his tesco shares`, `sell`, `tesco share`, ``],
    [`keep water levels below 15%`, `keep`, `water level`, ``],
    [`wait for john to pick up his pizza at pizza hut`, `wait`, `john`, ``],
    [`sanitize the database against xss attacks`, `sanitize`, `database`, ``],
    [`ensure nobody enters the area`, `ensure`, `nobody`, ``],
    [`buy three newspapers for fishing lure`, `buy`, `three newspaper`, ``],
    [`John tell me to buy cheeseburgers tuesday night for everybody`, `buy`, `cheeseburger`, `tuesday night`],
    [`so i'd like to watch the space shuttle launch tonight`, `watch`, `space shuttle`, `tonight`],
    [`buy a cello on amazon.com or find one on instagram`, `buy`, `cello`, ``],
    [`date stephanie on tuesday night and buy flowers`, `date`, `stephanie`, `on tuesday night`],
    [`forge a relationship with the investors over christmas`, `forge`, `relationship`, `over christmas`],
    [`wait until july to tell investors about daniel's suit`, `tell`, `investor`, `until july`],
    [`in august, buy june some flowers`, `buy`, `flower`, `in august`],
    [`accept credit cards over email`, `accept`, `credit card`, ``],
    // [`turn the radio down each weeknight`, `turn`, `radio`, `each weeknight`], //tricky
    [`allow users to create new artifacts`, `allow`, `user`, ``],
    [`by february, tell new users we accept donations`, `tell`, `new user`, `by february`],
    [`normalize all usernames to the main dataset at some point`, `normalize`, `username`, `at some point`],
    // [`eat carrots once a week`, `eat`, `carrot`, `once a week`],
    [`tell sam not to engage in insider trading when he calls`, `tell`, `sam`, ``],
    [`set alarm next tuesday`, `set`, `alarm`, `next tuesday`],
    [`buy all apples from tesco before they run out`, `buy`, `apple`, ``],
    [`ask fred to buy some apples from tescos`, `buy`, `apple`, ``],
    [`hey check my stocks in the morning`, `check`, `stock`, `in the morning`],
    [`ask jaqueline about turnip chips`, `ask`, `turnip chip`, ``],
    [`so, remind me to ask jaqueline where she bought those chips`, `ask`, `chip`, ``],
    [`chill the wine before the party`, `chill`, `wine`, ``],
    [`turn apples into applejuice and put them in the refridgerator`, `turn`, `apple`, ``],
    [`eat the old pizza before it goes bad`, `eat`, `pizza`, ``],
    [`pack a lunch for danny and sam on sunday morning`, `pack`, `lunch`, `on sunday morning`],
    [`set the correct time on my watch once the plane lands`, `set`, `time`, ``],
    [`remember to send everyone a reminder that taxes are non-negotiable`, `send`, `reminder`, ``],
    [`check the mailbox in the morning`, `check`, `mailbox`, `in the morning`],
    [`take out the garbage every thursday`, `take out`, `garbage`, `every thursday`],
    [`monitor subscription lifecycles`, `monitor`, `subscription lifecycle`, ``],
    [`don't forget about monitoring subscription lifecycles`, `monitoring`, `subscription lifecycle`, ``],
    [`use-case analysis project due by friday`, ``, ``, `due by friday`],
    // [`charge phone before going to bed`, `charge`, `phone`, `before going to bed`], //tricky
    [`remember to log hours for bookkeeping`, `log`, `hour`, ``],
    [`this tuesday, buy a new microphone`, `buy`, `microphone`, `this tuesday`],
    [`grab a new monitor when i'm shopping next weekend`, `grab`, `monitor`, `next weekend`],
    [`don't forget to buy headphones before the flight`, `buy`, `headphone`, ``],
    [`buy mangoes`, `buy`, `mango`, ``],
    [`slide the cabinet door all the way closed before leaving`, `slide`, `cabinet door`, ``],
    [`i gotta pay rent friday. don't let me forget`, `pay`, `rent`, `friday`],
    [`make sure the chores are done by tuesday`, `make sure`, `chore`, `by tuesday`],
    [`help hunter with the golf clubs this coming monday`, `help`, `golf club`, `this coming monday`],
    [`turn down the birthday invite`, `turn down`, `birthday invite`, ``],
    [`set all dials to repeat mode after this weekend`, `set`, `dial`, `after this weekend`],
    [`ensure floors are clean before jin arrives`, `ensure`, `floor`, ``],
    [`wash the floor each week after new years`, `wash`, `floor`, `each week after new years`],
    [`remember to read that washington post article about affluenza`, `read`, `washington post article`, ``],
    [`post a tweet about consumerism on april fools day`, `post`, `tweet`, `on april fools day`],
    // [`i need to repay sandra for her dinner yesterday before april`, `repay`, `sandra`, `yesterday`],
    [`i should remember the library books`, `remember`, `library book`, ``],
    [`i should remember to eat more brocolli`, `eat`, `brocolli`, ``],
    [`all the bills are what I need to pay by tuesday`, `bills`, `pay`, `by tuesday`],
  ]
  arr.forEach(function (a) {
    const doc = nlp(a[0])
    // let verb = doc.verbs(0).out('reduced')
    // t.equal(verb, a[1], a[0])

    // let noun = doc
    //   .nouns(0)
    //   .toSingular()
    //   .out('reduced')
    // t.equal(noun, a[2], a[0])

    let date = doc.match('#Date+').first().out('reduced')
    t.equal(date, a[3], a[0])
  })
  t.end()
})
