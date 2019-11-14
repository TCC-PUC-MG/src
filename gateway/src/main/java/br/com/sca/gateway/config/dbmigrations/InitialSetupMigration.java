package br.com.sca.gateway.config.dbmigrations;

import br.com.sca.gateway.domain.Authority;
import br.com.sca.gateway.domain.User;
import br.com.sca.gateway.security.AuthoritiesConstants;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.time.Instant;

/**
 * Creates the initial database setup.
 */
@ChangeLog(order = "001")
public class InitialSetupMigration {

    @ChangeSet(order = "01", author = "initiator", id = "01-addAuthorities")
    public void addAuthorities(MongoTemplate mongoTemplate) {
        Authority adminAuthority = new Authority();
        adminAuthority.setName(AuthoritiesConstants.ADMIN);
        Authority userAuthority = new Authority();
        userAuthority.setName(AuthoritiesConstants.USER);
        mongoTemplate.save(adminAuthority);
        mongoTemplate.save(userAuthority);
    }
}
