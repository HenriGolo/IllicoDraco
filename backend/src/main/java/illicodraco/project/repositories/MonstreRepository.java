package illicodraco.project.repositories;

import illicodraco.project.beans.Monstre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Interface java gérant le repository du Monstre
public interface MonstreRepository extends JpaRepository<Monstre, String> {

  Monstre save(Monstre monstre);

  Optional<Monstre> findById(String id);

  List<Monstre> findAll();

  long count();

}
